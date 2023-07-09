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

public class MongoConnectionRepository(IConfiguration configuration, ILogger<MongoConnectionRepository> logger) : BaseRepository<MongoConnectionEntity>(configuration, logger), IMongoConnectionRepository
{
	public async Task<MongoConnectionEntity> Add(string name, string connectionString)
	{
		using var _ = LogAdapter($"{Log.F(name)} {Log.F(connectionString)}");

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
		using var logger = LogAdapter(autoExit: false);

		var entities = await EntityCollection.AsQueryable().ToListAsync();

		logger.Exit($"{Log.F(entities.Count)}");

		return entities;
	}

	public async Task<MongoConnectionEntity> Update(ObjectId idDatabase, string connectionString)
	{
		using var _ = LogAdapter($"{Log.F(idDatabase)} {Log.F(connectionString)}");

		var update = Builders<MongoConnectionEntity>.Update.Set(db => db.ConnectionString, connectionString);

		return await EntityCollection.FindOneAndUpdateAsync(db => db.Id == idDatabase, update);
	}

	public async Task Delete(ObjectId idConnection)
	{
		await EntityCollection.DeleteOneAsync(connection => connection.Id == idConnection);
	}

	public async Task<MongoConnectionEntity> GetById(Guid idConnection)
	{
		using var logger = LogAdapter($"{Log.F(idConnection)}", autoExit: false);

		var connection = await EntityCollection.AsQueryable().FirstOrDefaultAsync(con => con.Id == idConnection.AsObjectId());

		logger.Exit($"found=${connection is not null}");

		return connection;
	}
}