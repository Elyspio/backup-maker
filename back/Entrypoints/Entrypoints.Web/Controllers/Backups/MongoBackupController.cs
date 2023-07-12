using Adapters.Authentication;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Backup;
using BackupMaker.Api.Abstractions.Models.Transports.Backup;
using BackupMaker.Api.Entrypoints.Web.Technical.Filters;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers.Backups;

/// <summary>
///     Entrypoint for <see cref="MongoBackupTaskData" />
/// </summary>
/// <param name="logger"></param>
/// <param name="backupTaskService"></param>
[Route("api/tasks/backup/mongo")]
[ApiController]
[Produces("application/json")]
public class MongoBackupController(ILogger<JobsController> logger, IMongoBackupTaskService backupTaskService) : TracingController(logger)
{
	/// <summary>
	///     Get all mongo backup task configurations
	/// </summary>
	/// <returns></returns>
	[HttpGet("")]
	[ProducesResponseType(typeof(List<MongoBackupTaskData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetMongoTasks()
	{
		using var logger = LogController(autoExit: false);

		var tasks = await backupTaskService.GetAll();

		logger.Exit($"{Log.F(tasks.Count)}");

		return Ok(tasks);
	}

	/// <summary>
	///     Create a new mongo backup task configuration
	/// </summary>
	/// <returns></returns>
	[HttpPost("")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	[Authorize(BackupMakerRole.Admin)]
	public async Task<IActionResult> CreateMongoTask(MongoBackupTaskBase task)
	{
		using var _ = LogController($"{Log.F(task)}");

		await backupTaskService.Add(task);

		return NoContent();
	}

	/// <summary>
	///     Update a  mongo backup task configuration
	/// </summary>
	/// <returns></returns>
	[HttpPut("{idTask:guid}")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	[Authorize(BackupMakerRole.Admin)]
	public async Task<IActionResult> UpdateMongoTask(Guid idTask, MongoBackupTaskBase task)
	{
		using var _ = LogController($"{Log.F(idTask)} {Log.F(task)}");

		await backupTaskService.Replace(idTask, task);

		return NoContent();
	}

	/// <summary>
	///     Delete a mongo backup task configurations
	/// </summary>
	/// <returns></returns>
	[HttpDelete("{idTask:guid}")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	[Authorize(BackupMakerRole.Admin)]
	public async Task<IActionResult> DeleteMongoTask(Guid idTask)
	{
		using var _ = LogController(Log.F(idTask));

		await backupTaskService.Delete(idTask);

		return NoContent();
	}
}