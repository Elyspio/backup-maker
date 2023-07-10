using BackupMaker.Api.Abstractions.Models.Transports.Requests;

namespace BackupMaker.Api.Abstractions.Models.Transports.Jobs;

/// <summary>
/// Represents a data model used for job-related operations.
/// </summary>
public class JobData : CreateJobRequest
{
	/// <summary>
	/// Gets or sets the unique identifier (ID) of the job.
	/// </summary>
	public required Guid Id { get; set; }
}