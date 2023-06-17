using BackupMaker.Api.Abstractions.Models.Transports.Jobs;

namespace BackupMaker.Api.Abstractions.Models.Transports.Responses;

public class GetJobsResponse
{
	public List<BackupMongoLocalJobData> BackupMongoLocalJobs { get; set; }
}