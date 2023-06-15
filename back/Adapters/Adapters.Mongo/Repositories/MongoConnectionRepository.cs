using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Adapters.Mongo.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace BackupMaker.Api.Adapters.Mongo.Repositories;

public class MongoConnectionRepository : BaseRepository<MongoConnectionEntity>, IMongoConnectionRepository
{
	public MongoConnectionRepository(IConfiguration configuration, ILogger<MongoConnectionRepository> logger) : base(configuration, logger)
	{
		_logger = logger;
	}

	public async Task<MongoConnectionEntity> Add(string name, string connectionString)
	{
		var entity = new MongoConnectionEntity
		{
			Name = name,
			ConnectionString = connectionString
		};
		await EntityCollection.InsertOneAsync(entity);

		return entity;
	}

	public async Task<List<MongoConnectionEntity>> GetAll()
	{
		var logger = _logger.Enter();

		var entities = await EntityCollection.AsQueryable().ToListAsync();

		logger.Exit($"{Log.F(entities.Count)}");

		return entities;
	}

	public async Task<MongoConnectionEntity> Update(ObjectId idDatabase, string connectionString)
	{
		var logger = _logger.Enter($"{Log.F(idDatabase)} {Log.F(connectionString)}");

		var update = Builders<MongoConnectionEntity>.Update.Set(db => db.ConnectionString, connectionString);

		var entity = await EntityCollection.FindOneAndUpdateAsync(db => db.Id == idDatabase, update);

		logger.Exit();

		return entity;
	}

	public async Task Delete(ObjectId idConnection)
	{
		await EntityCollection.DeleteOneAsync(connection => connection.Id == idConnection);
	}

	public async Task<MongoConnectionEntity> GetById(Guid idConnection)
	{
		var logger = _logger.Enter($"{Log.F(idConnection)}");

		var connection = await EntityCollection.AsQueryable().FirstOrDefaultAsync(con => con.Id == idConnection.AsObjectId());

		logger.Exit($"found=${connection is not null}");

		return connection;
	}
}