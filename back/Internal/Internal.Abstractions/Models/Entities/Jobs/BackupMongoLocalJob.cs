using BackupMaker.Api.Abstractions.Models.Base;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities.Jobs;

public class BackupMongoLocalJobEntity : JobBase
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }

	public ObjectId IdMongoBackup { get; set; }
	public ObjectId IdLocalDeploy { get; set; }
}