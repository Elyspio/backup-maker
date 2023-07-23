using System.Text.RegularExpressions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Interfaces.Services.Deploy;
using BackupMaker.Api.Abstractions.Interfaces.Triggers;
using BackupMaker.Api.Abstractions.Models.Base.Job;
using BackupMaker.Api.Abstractions.Models.Entities.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc cref="IJobService" />
internal sealed class JobService(IJobRepository jobRepository, ILogger<JobService> logger, JobAssembler jobAssembler, IMongoDatabaseService mongoDatabaseService,
		ILocalDeploymentService localDeploymentService, IMongoBackupTaskService mongoBackupTaskService, IFtpDeployService ftpDeployService, IJobTrigger jobTrigger)
	: CrudService<JobData, CreateJobRequest, JobEntity>(logger, jobRepository, jobAssembler), IJobService
{
	public async Task Trigger(Guid idJob)
	{
		using var _ = LogService($"{Log.F(idJob)}");

		if (!jobTrigger.Exist(idJob))
		{
			var job = await GetById(idJob);
			RegisterJob(job);
		}

		jobTrigger.Run(idJob);
	}

	public async Task Recreate()
	{
		using var _ = LogService();

		var entities = await  jobRepository.GetAll();

		var jobs = jobAssembler.Convert(entities);

		await Task.WhenAll(jobs.Select(job =>
		{
			RegisterJob(job);
			return Task.CompletedTask;
		}).ToList());
	}

	public new async Task<JobData> Add(CreateJobRequest @base)
	{
		var job = await base.Add(@base);
		RegisterJob(job);
		return job;
	}

	public new async Task Delete(Guid id)
	{
		await base.Delete(id);
		jobTrigger.Delete(id);
	}


	public new async Task<JobData> Replace(Guid id, CreateJobRequest @base)
	{
		var job = await base.Replace(id, @base);

		if (jobTrigger.Exist(job.Id)) jobTrigger.Delete(job.Id);

		RegisterJob(job);

		return job;
	}

	private void RegisterJob(JobData job)
	{
		jobTrigger.Register(job, () => Process(job, CancellationToken.None));
	}


	private string GenerateFilename(JobData job)
	{
		var txt = $"{job.Name}_{DateTime.Now:yyyy-MM-dd_HH-mm-ss}.zip";

		txt = Regex.Replace(txt, @"[\x00-\x1F\/\\:*?""<>|]", "-", RegexOptions.Compiled | RegexOptions.NonBacktracking);

		txt = Regex.Replace(txt, @"-+", "-", RegexOptions.Compiled | RegexOptions.NonBacktracking);

		return txt;
	}

	#region Processing

	// ReSharper disable once MemberCanBePrivate.Global Hangfire requires public method
	public async Task Process(JobData job, CancellationToken cancellationToken)
	{
		using var _ = LogService($"{Log.F(job)}");

		await using var stream = await HandleBackup(job, cancellationToken);

		await HandleDeploy(job, stream, cancellationToken);
	}

	private async Task<Stream> HandleBackup(JobData job, CancellationToken cancellationToken)
	{
		using var _ = LogService($"{Log.F(job.Id)}");

		switch (job.BackupType)
		{
			case JobBackup.Mongo:
				var backupTask = await mongoBackupTaskService.GetById(job.IdBackup);
				return await mongoDatabaseService.Backup(backupTask, cancellationToken);
			default:
				throw new ArgumentOutOfRangeException(nameof(job));
		}
	}


	private async Task HandleDeploy(JobData job, Stream archive, CancellationToken cancellationToken)
	{
		using var _ = LogService($"{Log.F(job.Id)} {Log.F(archive.Length)}");

		var filename = GenerateFilename(job);

		switch (job.DeployType)
		{
			case JobDeploy.Ftp:
				await ftpDeployService.Deploy(job.IdDeploy, archive, filename, cancellationToken);
				break;
			case JobDeploy.Local:
				await localDeploymentService.Deploy(job.IdDeploy, archive, filename, cancellationToken);
				break;
			default:
				throw new ArgumentOutOfRangeException(nameof(job));
		}
	}

	#endregion
}