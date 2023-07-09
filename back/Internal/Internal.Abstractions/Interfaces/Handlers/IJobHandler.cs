using BackupMaker.Api.Abstractions.Models.Transports.Jobs;

namespace BackupMaker.Api.Abstractions.Interfaces.Handlers;

public interface IJobHandler
{
	/// <summary>
	///     Process the job
	/// </summary>
	/// <param name="payload"></param>
	/// <returns></returns>
	Task Process(JobData payload);
}