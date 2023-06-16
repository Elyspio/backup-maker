using BackupMaker.Api.Abstractions.Models.Transports.Requests;

namespace BackupMaker.Api.Abstractions.Models.Transports.Jobs;

public class BackupMongoLocalJobData : CreateBackupMongoLocalJobRequest
{
	public Guid Id { get; set; }
}