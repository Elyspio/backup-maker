using BackupMaker.Api.Abstractions.Models.Entities.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

/// <summary>
///     Manage <see cref="JobEntity" />
/// </summary>
public interface IJobRepository
{
	/// <summary>
	///     Get all job entities
	/// </summary>
	/// <returns></returns>
	Task<List<JobEntity>> GetAll();

	/// <summary>
	///     Create a new job entity
	/// </summary>
	/// <param name="job"></param>
	/// <returns></returns>
	Task<JobEntity> Add(CreateJobRequest job);


	/// <summary>
	///     Delete a job entity
	/// </summary>
	/// <param name="id">Id of the configuration</param>
	/// <returns></returns>
	Task Delete(Guid id);

	/// <summary>
	///     Update a job entity
	/// </summary>
	/// <param name="idJob"></param>
	/// <param name="job"></param>
	/// <returns></returns>
	Task Update(Guid idJob, CreateJobRequest job);
}