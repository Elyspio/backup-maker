using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers;

[Route("/jobs")]
[ApiController]
public class JobsController : ControllerBase
{
	[HttpPost("backup-mongo-local")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> CreateBackupMongoLocalJob(CreateBackupMongoLocalJobRequest job)
	{
		return NoContent();
	}


	[HttpPut("backup-mongo-local/{job}/start")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> StartBackupMongoLocalJob(Guid job)
	{
		return NoContent();
	}

	[HttpDelete("backup-mongo-local/{job}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> StopBackupMongoLocalJob(Guid job)
	{
		return NoContent();
	}
}