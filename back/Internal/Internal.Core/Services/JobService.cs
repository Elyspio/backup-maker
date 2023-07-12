using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Clients;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Interfaces.Services.Deploy;
using BackupMaker.Api.Abstractions.Models.Base.Job;
using BackupMaker.Api.Abstractions.Models.Entities.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc cref="IJobService" />
internal class JobService(IJobRepository jobRepository, ILogger<JobService> logger, JobAssembler jobAssembler, IMongoDatabaseService mongoDatabaseService, ILocalDeploymentService localDeploymentService, IMongoBackupTaskService mongoBackupTaskService,
		IFtpClient ftpClient, IFtpDeployService ftpDeployService)
	: CrudService<JobData, CreateJobRequest, JobEntity>(logger, jobRepository, jobAssembler), IJobService
{
	private readonly IFtpClient _ftpClient = ftpClient;

	public async Task Process(JobData job)
	{
		using var _ = LogService($"{Log.F(job)}");

		await using var stream = await HandleBackup(job);

		var filename = $"{job.Name}:{DateTime.Now:yy-MM-dd-yyyy}";

		await HandleDeploy(job, stream, filename);
	}

	private async Task<Stream> HandleBackup(JobData job)
	{
		using var _ = LogService($"{Log.F(job.Id)}");

		switch (job.BackupType)
		{
			case JobBackup.Mongo:
				var backupTask = await mongoBackupTaskService.GetById(job.IdBackup);
				return await mongoDatabaseService.Backup(backupTask);
			default:
				throw new ArgumentOutOfRangeException();
		}
	}


	private async Task HandleDeploy(JobData job, Stream archive, string filename)
	{
		using var _ = LogService($"{Log.F(job.Id)} {Log.F(archive.Length)} {Log.F(filename)}");

		switch (job.DeployType)
		{
			case JobDeploy.Ftp:
				await ftpDeployService.Deploy(job.IdDeploy, archive, filename);
				break;
			case JobDeploy.Local:
				await localDeploymentService.Deploy(job.IdDeploy, archive, filename);
				break;
			default:
				throw new ArgumentOutOfRangeException();
		}
	}
}