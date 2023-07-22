using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Base.Backup;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities.Backup;

/// <summary>
///     This class represents the entities of the MongoDB backup tasks.
/// </summary>
/// <remarks>
///     It inherits from the `MongoBackupTaskBase` base class.
/// </remarks>
public sealed class MongoBackupTaskEntity : MongoBackupTaskBase, IEntity
{
	/// <summary>
	///     Gets or sets the ID of the MongoDB backup task entity.
	/// </summary>
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }
}