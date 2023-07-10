using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities;

/// <summary>
/// This class represents the entities of the MongoDB backup tasks.
/// </summary>
/// <remarks>
/// It inherits from the `MongoBackupTask` base class.
/// </remarks>
public class MongoBackupTaskEntity : MongoBackupTask
{
	/// <summary>
	/// Gets or sets the ID of the MongoDB backup task entity.
	/// </summary>
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }
}