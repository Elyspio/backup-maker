using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities.Connections;

/// <summary>
///     This class represents the entities of the MongoDB connections.
/// </summary>
/// <remarks>
///     It extends the `MongoConnectionBase` base class.
/// </remarks>
public class MongoConnectionEntity : MongoConnectionBase, IEntity
{
	/// <summary>
	///     Gets or sets the ID of the MongoDB connection entity.
	/// </summary>
	/// <value>
	///     This property gets/sets the value of the `Id` field.
	/// </value>
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }
}