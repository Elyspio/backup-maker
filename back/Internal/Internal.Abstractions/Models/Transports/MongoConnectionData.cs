using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

namespace BackupMaker.Api.Abstractions.Models.Transports;

public class MongoConnectionData : MongoConnectionBase
{
	public required Guid Id { get; set; }
}