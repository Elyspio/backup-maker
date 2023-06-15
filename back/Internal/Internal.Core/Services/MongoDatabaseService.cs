using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Abstractions.Models.Transports.Responses;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;
using SharpCompress.Archives;
using SharpCompress.Archives.Zip;
using SharpCompress.Common;

namespace BackupMaker.Api.Core.Services;

internal class MongoDatabaseService : IMongoDatabaseService
{
	private readonly ILogger<MongoDatabaseService> _logger;
	private readonly MongoConnectionAssembler _mongoConnectionAssembler;
	private readonly IMongoConnectionRepository _mongoConnectionRepository;

	private readonly IMongoDatabaseManager _mongoDatabaseManager;


	public MongoDatabaseService(IMongoDatabaseManager mongoDatabaseManager, IMongoConnectionRepository mongoConnectionRepository, MongoConnectionAssembler mongoConnectionAssembler, ILogger<MongoDatabaseService> logger)
	{
		_mongoDatabaseManager = mongoDatabaseManager;
		_mongoConnectionRepository = mongoConnectionRepository;
		_mongoConnectionAssembler = mongoConnectionAssembler;
		_logger = logger;
	}


	public async Task<GetConnectionInformationResponse> GetInfos()
	{
		var logger = _logger.Enter();

		var connections = await _mongoConnectionRepository.GetAll();

		var result = await connections.Parallelize(async connection => (Id: connection.Id.AsGuid(), Infos: await _mongoDatabaseManager.GetDatabases(connection.ConnectionString)));


		var data = result.Data.ToDictionary(pair => pair.Id, pair => pair.Infos);
		var errors = result.Exceptions.ToDictionary(pair => pair.Key.Id.AsGuid(), pair => pair.Value.ToString());

		logger.Exit();

		return new()
		{
			Errors = errors,
			Data = data
		};
	}

	public async Task<List<MongoConnectionData>> GetConnections()
	{
		var logger = _logger.Enter();

		var connections = await _mongoConnectionRepository.GetAll();

		logger.Exit($"{Log.F(connections.Count)}");

		return _mongoConnectionAssembler.Convert(connections);
	}

	public async Task AddConnection(string name, string connectionString)
	{
		var logger = _logger.Enter($"{Log.F(name)} {Log.F(connectionString)}");


		await _mongoConnectionRepository.Add(name, connectionString);


		logger.Exit();
	}

	public async Task UpdateConnectionString(Guid idConnection, string connectionString)
	{
		var logger = _logger.Enter($"{Log.F(idConnection)} {Log.F(connectionString)}");

		await _mongoConnectionRepository.Update(idConnection.AsObjectId(), connectionString);

		logger.Exit();
	}

	public async Task DeleteConnection(Guid idConnection)
	{
		var logger = _logger.Enter($"{Log.F(idConnection)}");

		await _mongoConnectionRepository.Delete(idConnection.AsObjectId());

		logger.Exit();
	}

	public async Task Backup(Guid idConnection, Dictionary<string, List<string>> elements)
	{
		var logger = _logger.Enter($"{Log.F(idConnection)} {Log.F(elements.Keys)}");


		var connection = await _mongoConnectionRepository.GetById(idConnection);

		var folderToCompress = await _mongoDatabaseManager.Backup(connection.ConnectionString, elements);

		var archivePath = Path.Join(folderToCompress, $"{idConnection}.zip");

		using var archive = ZipArchive.Create();
		archive.AddAllFromDirectory(folderToCompress);
		archive.SaveTo(archivePath, CompressionType.Deflate);

		logger.Exit($"{Log.F(archivePath)}");
	}
}