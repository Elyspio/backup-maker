using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
///     Manage <see cref="JobData" />
/// </summary>
public interface IJobService
{
	/// <summary>
	///     Get all jobs
	/// </summary>
	/// <returns></returns>
	Task<List<JobData>> GetAll();

	/// <summary>
	///     Create a new job
	/// </summary>
	/// <param name="deploy"></param>
	/// <returns></returns>
	Task Add(CreateJobRequest deploy);


	/// <summary>
	///     Delete a job
	/// </summary>
	/// <param name="id">Id of the configuration</param>
	/// <returns></returns>
	Task Delete(Guid id);

	/// <summary>
	///     Replace a job
	/// </summary>
	/// <param name="idJob"></param>
	/// <param name="job"></param>
	/// <returns></returns>
	Task Update(Guid idJob, CreateJobRequest job);
}