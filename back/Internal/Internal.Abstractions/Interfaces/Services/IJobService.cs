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
	///     Trigger a job to start now
	/// </summary>
	/// <param name="idJob"></param>
	/// <returns></returns>
	Task Trigger(Guid idJob);

	/// <summary>
	///     Clear hangfire databases and recreate jobs
	/// </summary>
	/// <returns></returns>
	Task Recreate();
}