using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Transports;

public class MongoConnectionData : MongoConnectionBase
{
	public required Guid Id { get; set; }
}