using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Entities.Connections;
using BackupMaker.Api.Adapters.Mongo.Repositories.Base;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Connections;

/// <inheritdoc cref="IMongoConnectionRepository" />
internal sealed class MongoConnectionRepository(IConfiguration configuration, ILogger<MongoConnectionRepository> logger) :
	CrudRepository<MongoConnectionEntity, MongoConnectionBase>(configuration, logger), IMongoConnectionRepository
{
	public async Task<MongoConnectionEntity> UpdateConnectionString(ObjectId id, string connectionString)
	{
		using var _ = LogAdapter($"{Log.F(id)}");

		var update = Update.Set(con => con.ConnectionString, connectionString);
		var filter = Filter.Eq(con => con.Id, id);
		return await EntityCollection.FindOneAndUpdateAsync(filter, update, new FindOneAndUpdateOptions<MongoConnectionEntity, MongoConnectionEntity>
		{
			ReturnDocument = ReturnDocument.After
		});
	}
}