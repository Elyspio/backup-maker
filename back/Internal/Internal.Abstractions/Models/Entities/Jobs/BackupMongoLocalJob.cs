using BackupMaker.Api.Abstractions.Models.Base;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities.Jobs;

public class JobEntity : JobBase
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }

	public required ObjectId IdDeploy { get; set; }
	public required ObjectId IdBackup { get; set; }
}