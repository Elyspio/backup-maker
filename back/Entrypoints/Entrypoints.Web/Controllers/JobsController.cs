using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Abstractions.Models.Transports.Responses;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers;

[Route("api/jobs/backup")]
[ApiController]
[Tags("JobsBackup")]
[Produces("application/json")]
public class JobsController : ControllerBase
{
	private readonly IMongoBackupTaskService _backupTaskService;

	private readonly ILogger<JobsController> _logger;

	public JobsController(ILogger<JobsController> logger, IMongoBackupTaskService backupTaskService)
	{
		_logger = logger;
		_backupTaskService = backupTaskService;
	}

	[HttpGet("")]
	[ProducesResponseType(typeof(GetJobsResponse), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetJobs()
	{
		return Ok();
	}


	[HttpPost("mongo-local")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> CreateBackupMongoLocalJob(CreateBackupMongoLocalJobRequest job)
	{
		return NoContent();
	}


	[HttpPut("mongo-local/{job:guid}/start")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> StartBackupMongoLocalJob(Guid job)
	{
		return NoContent();
	}

	[HttpDelete("mongo-local/{job:guid}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> StopBackupMongoLocalJob(Guid job)
	{
		return NoContent();
	}
}