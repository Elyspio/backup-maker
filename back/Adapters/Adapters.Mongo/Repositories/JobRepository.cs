using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Entities.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Adapters.Mongo.Repositories.Base;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace BackupMaker.Api.Adapters.Mongo.Repositories;

/// Repository implementation for
/// <see cref="JobEntity" />
public class JobRepository(IConfiguration conf, ILogger<JobRepository> logger) : BaseRepository<JobEntity>(conf, logger), IJobRepository
{
	/// <inheritdoc />
	public async Task<List<JobEntity>> GetAll()
	{
		using var logger = LogAdapter(autoExit: false);

		var jobs = await EntityCollection.AsQueryable().ToListAsync();

		logger.Exit($"{Log.F(jobs.Count)}");

		return jobs;
	}

	/// <inheritdoc />
	public async Task<JobEntity> Add(CreateJobRequest job)
	{
		using var logger = LogAdapter($"{Log.F(job)}", autoExit: false);

		var entity = new JobEntity
		{
			BackupType = job.BackupType,
			DeployType = job.DeployType,
			IdDeploy = job.IdDeploy.AsObjectId(),
			IdBackup = job.IdBackup.AsObjectId(),
			CronInterval = job.CronInterval,
			Name = job.Name
		};

		await EntityCollection.InsertOneAsync(entity);

		logger.Exit($"{Log.F(entity.Id)}");

		return entity;
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		using var _ = LogAdapter($"{Log.F(id)}");

		await EntityCollection.DeleteOneAsync(job => job.Id == id.AsObjectId());
	}

	/// <inheritdoc />
	public async Task Update(Guid idJob, CreateJobRequest job)
	{
		using var _ = LogAdapter($"{Log.F(idJob)} {Log.F(job)}");

		var entity = new JobEntity
		{
			Name = job.Name,
			BackupType = job.BackupType,
			CronInterval = job.CronInterval,
			DeployType = job.DeployType,
			IdBackup = job.IdBackup.AsObjectId(),
			IdDeploy = job.IdDeploy.AsObjectId(),
			Id = idJob.AsObjectId()
		};

		await EntityCollection.ReplaceOneAsync(j => j.Id == entity.Id, entity);
	}
}