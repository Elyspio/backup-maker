using BackupMaker.Api.Abstractions.Models.Base.Job;

namespace BackupMaker.Api.Abstractions.Models.Transports.Requests;

/// <summary>
///     Represents a request to create a new job.
/// </summary>
public class CreateJobRequest : JobBase
{
	/// <summary>
	///     Gets or sets the unique identifier (ID) for the deployment associated with this job.
	/// </summary>
	public required Guid IdDeploy { get; set; }

	/// <summary>
	///     Gets or sets the unique identifier (ID) for the backup associated with this job.
	/// </summary>
	public required Guid IdBackup { get; set; }
}