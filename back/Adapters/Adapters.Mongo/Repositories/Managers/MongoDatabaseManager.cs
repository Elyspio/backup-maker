using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;
using BackupMaker.Api.Adapters.Mongo.Technical;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Diagnostics;
using System.Text;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Managers;

/// <inheritdoc cref="IMongoDatabaseManager" />
internal class MongoDatabaseManager(ILogger<MongoDatabaseManager> logger) : TracingContext(logger), IMongoDatabaseManager
{
	public async Task<List<DatabaseInfo>> GetDatabases(string connectionString)
	{
		using var _ = LogAdapter();

		var client = MongoClientFactory.Create(connectionString).Client;

		var databasesName = await (await client.ListDatabaseNamesAsync()).ToListAsync();

		var databasesResult = await databasesName.Parallelize(async databaseName =>
		{
			using var __ = CreateInnerActivity($"MongoDatabaseManager.GetDatabases {Log.F(databaseName)}");

			var database = client.GetDatabase(databaseName);

			var collections = await GetCollectionOnlyNames(database);

			var collectionsResult = await collections.Parallelize(collectionName => GetCollectionInfo(database, collectionName));

			if (collectionsResult.Status is ParallelStatus.Faulted) throw new AggregateException(collectionsResult.Exceptions.Values);


			return new DatabaseInfo(databaseName, collectionsResult.Data);
		});

		if (databasesResult.Status is ParallelStatus.Faulted) throw new AggregateException(databasesResult.Exceptions.Values);


		return databasesResult.Data;
	}

	public async Task<string> Backup(string connectionString, Dictionary<string, List<string>> elements)
	{
		using var logger = LogAdapter($"{Log.F(elements)}", autoExit: false);


		var tempDir = Path.Join(Path.GetTempPath(), "backup-maker", DateTime.Now.ToString("yy-MMM-dd.hh-mm-ss"));

		var commands = await Task.WhenAll(elements.Select(async elem =>
		{
			var database = new MongoClient(connectionString).GetDatabase(elem.Key);

			var databaseCollections = await GetCollectionOnlyNames(database);

			return GenerateMongoDumpCommandLine(connectionString, elem.Key, databaseCollections.Except(elem.Value).ToList(), tempDir);
		}));

		var results = await commands.Parallelize(Dump);

		var exceptions = new List<Exception>();
		var i = 0;
		foreach (var (_, stderr, exitCode) in results.Data)
		{
			i += 1;
			if (exitCode == 0) continue;
			exceptions.Add(new($"{elements.Keys.ToArray()[i - 1]}: {stderr}"));
		}

		if (exceptions.Any()) throw new AggregateException(exceptions);


		logger.Exit($"Output directory = {tempDir}");

		return tempDir;
	}


	private async Task<(string stdout, string stderr, int exitCode)> Dump(string command)
	{
		using var _ = LogAdapter();

		// Create a new process instance
		var process = new Process();

		// Configure the process start info
		var startInfo = new ProcessStartInfo
		{
			FileName = "mongodump", // Assuming 'mongodump' is in the system's PATH
			Arguments = command,
			RedirectStandardOutput = true,
			RedirectStandardError = true,
			UseShellExecute = false
		};
		// Assign the start info to the process
		process.StartInfo = startInfo;

		var stdout = new StringBuilder();
		var stderr = new StringBuilder();

		// Event handler for capturing stdout
		process.OutputDataReceived += (_, e) =>
		{
			if (!string.IsNullOrEmpty(e.Data)) stdout.Append(e.Data);
		};

		// Event handler for capturing stderr
		process.ErrorDataReceived += (_, e) =>
		{
			if (!string.IsNullOrEmpty(e.Data)) stderr.Append(e.Data);
		};

		// Start the process
		process.Start();

		// Begin capturing stdout and stderr
		process.BeginOutputReadLine();
		process.BeginErrorReadLine();
		// Wait for the process to exit
		await process.WaitForExitAsync();

		return (stdout.ToString(), stderr.ToString(), process.ExitCode);
	}

	private string GenerateMongoDumpCommandLine(string connectionString, string database, IEnumerable<string> excludedConnection, string directory)
	{
		var ignore = excludedConnection.Aggregate("", (acc, current) =>
		{
			acc += $" --excludeCollection {current}";
			return acc;
		});

		return $"--uri \"{connectionString}\" --out {directory} --db {database} {ignore} --out {directory} ";
	}


	/// <summary>
	///     Get detailed info about a collection
	/// </summary>
	/// <param name="database"></param>
	/// <param name="collectionName"></param>
	/// <returns></returns>
	private async Task<CollectionInfo> GetCollectionInfo(IMongoDatabase database, string collectionName)
	{
		using var _ = LogAdapter($"{database.DatabaseNamespace} {Log.F(collectionName)}");

		var scale = Math.Pow(1024, 2);
		var stats = await database.RunCommandAsync(new BsonDocumentCommand<BsonDocument>(new()
		{
			{
				"collstats", collectionName
			}
		}));


		var indexes = stats["indexSizes"].AsBsonDocument.ToDictionary().ToDictionary(pair => pair.Key, pair => Convert.ToDouble(pair.Value) / scale);


		return new(collectionName, stats["count"].AsInt32, new(stats["totalSize"].ToDouble() / scale, stats["storageSize"].ToDouble() / scale, indexes));
	}


	/// <summary>
	///     Get all collections in a database (without returning views)
	/// </summary>
	/// <param name="database"></param>
	/// <returns></returns>
	private async Task<List<string>> GetCollectionOnlyNames(IMongoDatabase database)
	{
		using var _ = LogAdapter($"database={database.DatabaseNamespace.DatabaseName}");

		var storages = await (await database.ListCollectionsAsync()).ToListAsync();

		return storages.Where(s => s["type"] == "collection").Select(s => s["name"].AsString).ToList();
	}
}