using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc />
public class JobService(IJobRepository jobRepository, ILogger<JobService> logger, JobAssembler jobAssembler) : TracingContext(logger), IJobService
{
	private readonly JobAssembler _jobAssembler = jobAssembler;
	private readonly IJobRepository _jobRepository = jobRepository;


	/// <inheritdoc />
	public async Task<List<JobData>> GetAll()
	{
		using var logger = LogService(autoExit: false);

		var jobs = await _jobRepository.GetAll();

		logger.Exit($"{Log.F(jobs.Count)}");

		return _jobAssembler.Convert(jobs);
	}

	/// <inheritdoc />
	public async Task Add(CreateJobRequest deploy)
	{
		using var _ = LogService($"{Log.F(deploy)}");

		await _jobRepository.Add(deploy);
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		using var _ = LogService($"{Log.F(id)}");

		await _jobRepository.Delete(id);
	}

	/// <inheritdoc />
	public async Task Update(Guid idJob, CreateJobRequest job)
	{
		using var _ = LogService($"{Log.F(idJob)} {Log.F(job)}");

		await _jobRepository.Update(idJob, job);
	}
}