using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Entities.Connections;
using MongoDB.Bson;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

/// <summary>
///     Represents Mongo database connection operations.
/// </summary>
public interface IMongoConnectionRepository : ICrudRepository<MongoConnectionEntity, MongoConnectionBase>
{
	/// <param name="id">The identifier of the connection.</param>
	/// <param name="connectionString">The connection string of the database.</param>
	/// <returns>The updated MongoConnectionEntity.</returns>
	public Task<MongoConnectionEntity> UpdateConnectionString(ObjectId id, string connectionString);
}