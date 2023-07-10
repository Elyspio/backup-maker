using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities;

/// <summary>
/// The class represents a local deployment entity.
/// </summary>
public class LocalDeployEntity : LocalDeployBase
{
	/// <summary>
	/// Gets or sets the ObjectId of the local deployment entity. This field is also the BsonId.
	/// </summary>
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }
}