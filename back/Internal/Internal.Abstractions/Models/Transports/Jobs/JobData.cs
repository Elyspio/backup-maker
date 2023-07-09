using BackupMaker.Api.Abstractions.Models.Transports.Requests;

namespace BackupMaker.Api.Abstractions.Models.Transports.Jobs;

public class JobData : CreateJobRequest
{
	public required Guid Id { get; set; }
}