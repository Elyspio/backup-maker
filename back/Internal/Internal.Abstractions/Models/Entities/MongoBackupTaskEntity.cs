using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities;

public class MongoBackupTaskEntity : MongoBackupTask
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }


}