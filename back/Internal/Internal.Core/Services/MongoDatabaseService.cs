using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Exceptions;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;
using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;
using System.Net;

namespace BackupMaker.Api.Core.Services;

internal class MongoDatabaseService : IMongoDatabaseService
{
	private readonly ILogger<MongoDatabaseService> _logger;
	private readonly MongoConnectionAssembler _mongoConnectionAssembler;

	private readonly IMongoDatabaseManager _mongoDatabaseManager;
	private readonly IMongoConnectionRepository _mongoConnectionRepository;


	public MongoDatabaseService(IMongoDatabaseManager mongoDatabaseManager, IMongoConnectionRepository mongoConnectionRepository, MongoConnectionAssembler mongoConnectionAssembler, ILogger<MongoDatabaseService> logger)
	{
		_mongoDatabaseManager = mongoDatabaseManager;
		_mongoConnectionRepository = mongoConnectionRepository;
		_mongoConnectionAssembler = mongoConnectionAssembler;
		_logger = logger;
	}

	public async Task<Dictionary<Guid, List<DatabaseInfo>>> GetInfos()
	{
		var logger = _logger.Enter();

		var connections = await _mongoConnectionRepository.GetAll();

		var result = await connections.Parallelize(async connection => (Id: connection.Id.AsGuid(), Infos: await  _mongoDatabaseManager.GetDatabases(connection.ConnectionString)));

		if (result.Status == ParallelStatus.Faulted)
		{
			var messages = result.Exceptions.Select((pair) => $"{pair.Key.Id} {pair.Value}");
			throw new HttpException(HttpStatusCode.InternalServerError, string.Join("\n\n", messages));
		}

		logger.Exit();
		
		return result.Data.ToDictionary(pair => pair.Id, pair => pair.Infos);
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
}