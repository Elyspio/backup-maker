using BackupMaker.Api.Abstractions.Models.Entities.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
///     Manage <see cref="JobData" />
/// </summary>
public interface IJobService : ICrudService<JobData, CreateJobRequest, JobEntity>
{
	/// <summary>
	///     Process the job. Implement this method to define specific job processing logic.
	/// </summary>
	/// <param name="job">The JobData instance that the job processing logic will use.</param>
	/// <returns>A Task representing the asynchronous operation.</returns>
	Task Process(JobData job);
}