using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

namespace BackupMaker.Api.Abstractions.Models.Transports;

public class MongoBackupJobData : MongoBackupJob
{
	public Guid Id { get; set; }
}