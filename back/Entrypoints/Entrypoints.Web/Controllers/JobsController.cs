using Adapters.Authentication;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Entrypoints.Web.Technical.Filters;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers;

/// <summary>
///     Entrypoint for <see cref="JobData" />
/// </summary>
[Route("api/jobs")]
[ApiController]
[Produces("application/json")]
public sealed class JobsController(ILogger<JobsController> logger, IJobService jobService) : TracingController(logger)
{
	/// <summary>
	///     Get all jobs
	/// </summary>
	/// <returns></returns>
	[HttpGet("")]
	[ProducesResponseType(typeof(List<JobData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetJobs()
	{
		var jobs = await jobService.GetAll();
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
		await jobService.Add(job);
		return NoContent();
	}


	/// <summary>
	///     Update a job
	/// </summary>
	/// <param name="idJob"></param>
	/// <param name="job"></param>
	/// <returns></returns>
	[HttpPut("{idJob:guid}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[Authorize(BackupMakerRole.Admin)]
	public async Task<IActionResult> UpdateJob(Guid idJob, CreateJobRequest job)
	{
		await jobService.Replace(idJob, job);
		return NoContent();
	}

	/// <summary>
	///     Update a job
	/// </summary>
	/// <param name="idJob"></param>
	/// <param name="job"></param>
	/// <returns></returns>
	[HttpPost("{idJob:guid}/trigger")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[Authorize(BackupMakerRole.Admin)]
	public async Task<IActionResult> TriggerJob(Guid idJob)
	{
		await jobService.Trigger(idJob);
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
		await jobService.Delete(idJob);
		return NoContent();
	}


	[HttpPatch]
	[Authorize(BackupMakerRole.Admin)]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> RecreateJobs()
	{
		await jobService.Recreate();
		return NoContent();
	}
}