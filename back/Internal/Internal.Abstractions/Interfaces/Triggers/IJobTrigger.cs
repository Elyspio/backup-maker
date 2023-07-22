using System.Linq.Expressions;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;

namespace BackupMaker.Api.Abstractions.Interfaces.Triggers;

/// <summary>
///     Interface responsible for job triggers.
/// </summary>
public interface IJobTrigger
{
	/// <summary>
	///     Candidate for a job registration procedure.
	/// </summary>
	/// <param name="job">Structured job data.</param>
	/// <param name="methodCall">Job callback</param>
	void Register(JobData job, Expression<Func<Task>> methodCall);

	/// <summary>
	///     Execution initiation point for a specific job.
	/// </summary>
	/// <param name="idJob">
	///     Identifying key for the job to run.
	/// </param>
	void Run(Guid idJob);


	/// <param name="idJob"></param>
	/// <returns>If there is a recurring job with this id</returns>
	bool Exist(Guid idJob);


	/// <summary>
	///     Delete a recurring job
	/// </summary>
	/// <param name="idJob"></param>
	void Delete(Guid idJob);
}