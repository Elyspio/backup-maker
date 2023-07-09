using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Abstractions.Models.Transports.Responses;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;
using SharpCompress.Archives;
using SharpCompress.Archives.Zip;
using SharpCompress.Common;

namespace BackupMaker.Api.Core.Services;

internal class MongoDatabaseService(IMongoDatabaseManager mongoDatabaseManager, IMongoConnectionRepository mongoConnectionRepository, MongoConnectionAssembler mongoConnectionAssembler, ILogger<MongoDatabaseService> logger) : TracingContext(logger),
	IMongoDatabaseService
{
	private readonly ILogger<MongoDatabaseService> _logger = logger;
	private readonly MongoConnectionAssembler _mongoConnectionAssembler = mongoConnectionAssembler;
	private readonly IMongoConnectionRepository _mongoConnectionRepository = mongoConnectionRepository;

	private readonly IMongoDatabaseManager _mongoDatabaseManager = mongoDatabaseManager;


	public async Task<GetConnectionInformationResponse> GetInfos()
	{
		using var _ = LogService();

		var connections = await _mongoConnectionRepository.GetAll();

		var result = await connections.Parallelize(async connection => (Id: connection.Id.AsGuid(), Infos: await _mongoDatabaseManager.GetDatabases(connection.ConnectionString)));


		var data = result.Data.ToDictionary(pair => pair.Id, pair => pair.Infos);
		var errors = result.Exceptions.ToDictionary(pair => pair.Key.Id.AsGuid(), pair => pair.Value.ToString());


		return new()
		{
			Errors = errors,
			Data = data
		};
	}

	public async Task<List<MongoConnectionData>> GetConnections()
	{
		using var logger = LogService(autoExit: false);

		var connections = await _mongoConnectionRepository.GetAll();

		logger.Exit($"{Log.F(connections.Count)}");

		return _mongoConnectionAssembler.Convert(connections);
	}

	public async Task AddConnection(string name, string connectionString)
	{
		using var _ = LogService($"{Log.F(name)} {Log.F(connectionString)}");

		await _mongoConnectionRepository.Add(name, connectionString);
	}

	public async Task UpdateConnectionString(Guid idConnection, string connectionString)
	{
		using var _ = LogService($"{Log.F(idConnection)} {Log.F(connectionString)}");

		await _mongoConnectionRepository.Update(idConnection.AsObjectId(), connectionString);
	}

	public async Task DeleteConnection(Guid idConnection)
	{
		using var _ = LogService($"{Log.F(idConnection)}");

		await _mongoConnectionRepository.Delete(idConnection.AsObjectId());
	}

	public async Task<string> Backup(MongoBackupTask task)
	{
		using var logger = LogService($"{Log.F(task.IdConnection)} {Log.F(task.Elements.Keys)}", autoExit: false);


		var connection = await _mongoConnectionRepository.GetById(task.IdConnection);

		var folderToCompress = await _mongoDatabaseManager.Backup(connection.ConnectionString, task.Elements);

		var archivePath = Path.Join(folderToCompress, $"{task.IdConnection}.zip");

		using var archive = ZipArchive.Create();
		archive.AddAllFromDirectory(folderToCompress);
		archive.SaveTo(archivePath, CompressionType.Deflate);

		logger.Exit($"{Log.F(archivePath)}");

		return archivePath;
	}
}