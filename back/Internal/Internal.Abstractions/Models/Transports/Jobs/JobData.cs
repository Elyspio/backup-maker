using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;

namespace BackupMaker.Api.Abstractions.Models.Transports.Jobs;

/// <summary>
///     Represents a data model used for job-related operations.
/// </summary>
public sealed class JobData : CreateJobRequest, ITransport
{
	/// <summary>
	///     Gets or sets the unique identifier (ID) of the job.
	/// </summary>
	public required Guid Id { get; init; }
}