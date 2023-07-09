using BackupMaker.Api.Abstractions.Models.Base;

namespace BackupMaker.Api.Abstractions.Models.Transports.Requests;

public class CreateJobRequest : JobBase
{
	public required Guid IdDeploy { get; set; }
	public required Guid IdBackup { get; set; }
}