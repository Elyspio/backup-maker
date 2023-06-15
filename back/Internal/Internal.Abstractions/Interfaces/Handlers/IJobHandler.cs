namespace BackupMaker.Api.Abstractions.Interfaces.Handlers;

public interface IJobHandler<T>
{
	/// <summary>
	///     Process the job
	/// </summary>
	/// <param name="payload"></param>
	/// <returns></returns>
	Task Process(T payload);
}