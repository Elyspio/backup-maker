using Adapters.Authentication;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Entrypoints.Web.Controllers.Base;
using BackupMaker.Api.Entrypoints.Web.Technical.Filters;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers;

/// <summary>
///     Entrypoint for <see cref="JobData" />
/// </summary>
[Route("api/jobs")]
[ApiController]
[Produces("application/json")]
public class JobsController(ILogger<JobsController> logger, IJobService jobService) : TracingController(logger)
{
	private readonly IJobService _jobService = jobService;

	/// <summary>
	///     Get all jobs
	/// </summary>
	/// <returns></returns>
	[HttpGet("")]
	[ProducesResponseType(typeof(List<JobData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetJobs()
	{
		var jobs = await _jobService.GetAll();
		return Ok(jobs);
	}


	/// <summary>
	///     Create a new job
	/// </summary>
	/// <param name="job"></param>
	/// <returns></returns>
	[HttpPost("")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[Authorize(BackupMakerRole.Admin)]
	public async Task<IActionResult> CreateJob(CreateJobRequest job)
	{
		await _jobService.Add(job);
		return NoContent();
	}


	/// <summary>
	///     Trigger a job
	/// </summary>
	/// <param name="idJob"></param>
	/// <returns></returns>
	[HttpPut("{idJob:guid}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[Authorize(BackupMakerRole.Admin)]
	public async Task<IActionResult> UpdateJob(Guid idJob, CreateJobRequest job)
	{
		await _jobService.Update(idJob, job);
		return NoContent();
	}

	/// <summary>
	///     Delete a job
	/// </summary>
	/// <param name="idJob"></param>
	/// <returns></returns>
	[HttpDelete("{idJob:guid}/")]
	[Authorize(BackupMakerRole.Admin)]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> DeleteJob(Guid idJob)
	{
		await _jobService.Delete(idJob);
		return NoContent();
	}
}