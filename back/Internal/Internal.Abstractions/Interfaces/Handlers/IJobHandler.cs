using BackupMaker.Api.Abstractions.Models.Transports.Jobs;

namespace BackupMaker.Api.Abstractions.Interfaces.Handlers;

/// <summary>
/// The IJobHandler interface provides a method for job processing
/// </summary>
public interface IJobHandler
{
	/// <summary>
	/// Process the job. Implement this method to define specific job processing logic.
	/// </summary>
	/// <param name="payload">The JobData instance that the job processing logic will use.</param>
	/// <returns>A Task representing the asynchronous operation.</returns>
	Task Process(JobData payload);
}