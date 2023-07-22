using System.Collections.Concurrent;
using System.Linq.Expressions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Exceptions;
using BackupMaker.Api.Abstractions.Interfaces.Triggers;
using Hangfire;
using Hangfire.Storage;
using Microsoft.Extensions.Logging;
using JobData = BackupMaker.Api.Abstractions.Models.Transports.Jobs.JobData;

namespace BackupMaker.Api.Adapters.Hangfire.Triggers;

internal sealed class JobTrigger : TracingAdapter, IJobTrigger
{
	private readonly ConcurrentDictionary<Guid, RecurringJobDto> _jobs;

	public JobTrigger(ILogger<JobTrigger> _logger) : base(_logger)
	{
		using var logger = LogAdapter(autoExit: false);
		_jobs = new ConcurrentDictionary<Guid, RecurringJobDto>();
		_ = new Timer(x => UpdateRecurringJobs(), null, TimeSpan.Zero, TimeSpan.FromSeconds(30));
	}


	public void Register(JobData job, Expression<Func<Task>> methodCall)
	{
		using var _ = LogAdapter($"{Log.F(job)}");

		ArgumentNullException.ThrowIfNull(job);

		RecurringJob.AddOrUpdate($"{job.Id}", methodCall, job.CronInterval);
	}

	public void Run(Guid idJob)
	{
		using var _ = LogAdapter($"{Log.F(idJob)}");

		RecurringJob.TriggerJob(idJob.ToString());
	}

	public bool Exist(Guid idJob)
	{
		using var _ = LogAdapter($"{Log.F(idJob)}");

		return _jobs.ContainsKey(idJob);
	}

	public void Delete(Guid idJob)
	{
		using var _ = LogAdapter($"{Log.F(idJob)}");

		if (!Exist(idJob)) throw new HttpException.NotFound<RecurringJobDto>(idJob);

		RecurringJob.RemoveIfExists(idJob.ToString());

		_jobs.Remove(idJob, out var _);
	}

	private void UpdateRecurringJobs()
	{
		using var logger = LogAdapter(autoExit: false);
		var jobs = JobStorage.Current.GetConnection().GetRecurringJobs();

		_jobs.Clear();

		foreach (var job in jobs) _jobs[Guid.Parse(job.Id)] = job;

		logger.Exit($"{Log.F(_jobs.Keys)}");
	}
}