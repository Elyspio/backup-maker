using BackupMaker.Api.Abstractions.Models.Base;

namespace BackupMaker.Api.Abstractions.Models.Transports.Requests;

public class CreateBackupMongoLocalJobRequest : JobBase
{
	public required Guid IdMongoBackup { get; set; }
	public required Guid IdLocalDeploy { get; set; }
}