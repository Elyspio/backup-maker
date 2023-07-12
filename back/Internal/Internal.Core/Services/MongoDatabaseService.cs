using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Exceptions;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Backup;
using BackupMaker.Api.Abstractions.Models.Transports.Connections;
using BackupMaker.Api.Abstractions.Models.Transports.Responses;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;
using SharpCompress.Archives;
using SharpCompress.Archives.Zip;
using SharpCompress.Common;
using System.Net;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc cref="IMongoDatabaseService" />
internal class MongoDatabaseService(IMongoDatabaseManager mongoDatabaseManager, IMongoConnectionRepository mongoConnectionRepository, MongoConnectionAssembler mongoConnectionAssembler, ILogger<MongoDatabaseService> logger) : TracingContext(logger),
	IMongoDatabaseService
{
	public async Task<GetConnectionInformationResponse> GetInfos()
	{
		using var _ = LogService();

		var connections = await mongoConnectionRepository.GetAll();

		var result = await connections.Parallelize(async connection => (Id: connection.Id.AsGuid(), Infos: await mongoDatabaseManager.GetDatabases(connection.ConnectionString)));


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

		var connections = await mongoConnectionRepository.GetAll();

		logger.Exit($"{Log.F(connections.Count)}");

		return mongoConnectionAssembler.Convert(connections);
	}

	public async Task AddConnection(string name, string connectionString)
	{
		using var _ = LogService($"{Log.F(name)} {Log.F(connectionString)}");

		await mongoConnectionRepository.Add(new()
		{
			Name = name,
			ConnectionString = connectionString
		});
	}

	public async Task UpdateConnectionString(Guid idConnection, string connectionString)
	{
		using var _ = LogService($"{Log.F(idConnection)} {Log.F(connectionString)}");

		await mongoConnectionRepository.UpdateConnectionString(idConnection.AsObjectId(), connectionString);
	}

	public async Task DeleteConnection(Guid idConnection)
	{
		using var _ = LogService($"{Log.F(idConnection)}");

		await mongoConnectionRepository.Delete(idConnection.AsObjectId());
	}

	public async Task<Stream> Backup(MongoBackupTaskBase task)
	{
		using var logger = LogService($"{Log.F(task.IdConnection)} {Log.F(task.Elements.Keys)}", autoExit: false);

		var connection = await mongoConnectionRepository.GetById(task.IdConnection.AsObjectId());

		if (connection is null) throw new HttpException(HttpStatusCode.NotFound, $"Could not find mongo connection with id={task.IdConnection}");

		var folderToCompress = await mongoDatabaseManager.Backup(connection.ConnectionString, task.Elements);

		var outputStream = new MemoryStream();

		using var archive = ZipArchive.Create();
		archive.AddAllFromDirectory(folderToCompress);
		archive.SaveTo(outputStream, CompressionType.Deflate);

		logger.Exit($"{Log.F(outputStream.Length)}");

		return outputStream;
	}
}