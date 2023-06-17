using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Transports;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers;

[Route("api/tasks/backup")]
[ApiController]
[Produces("application/json")]
[Tags("TasksBackup")]
public class TasksController : ControllerBase
{
	private readonly IMongoBackupTaskService _backupTaskService;
	private readonly ILogger<JobsController> _logger;

	public TasksController(ILogger<JobsController> logger, IMongoBackupTaskService backupTaskService)
	{
		_logger = logger;
		_backupTaskService = backupTaskService;
	}

	/// <summary>
	///     Get all mongo backup task configurations
	/// </summary>
	/// <returns></returns>
	[HttpGet("mongo")]
	[ProducesResponseType(typeof(List<MongoBackupTaskData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetMongoTasks()
	{
		var logger = _logger.Enter("", LogLevel.Information);

		var tasks = await _backupTaskService.GetAll();

		logger.Exit($"{Log.F(tasks.Count)}");

		return Ok(tasks);
	}

	/// <summary>
	///     Create a new mongo backup task configuration
	/// </summary>
	/// <returns></returns>
	[HttpPost("mongo")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> CreateMongoTask(MongoBackupTask task)
	{
		var logger = _logger.Enter($"{Log.F(task)}", LogLevel.Information);

		await _backupTaskService.Add(task);

		logger.Exit();

		return NoContent();
	}	
	/// <summary>
	///     Update a  mongo backup task configuration
	/// </summary>
	/// <returns></returns>
	[HttpPut("mongo/{idTask:guid}")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> UpdateMongoTask(Guid idTask, MongoBackupTask task)
	{
		var logger = _logger.Enter($"{Log.F(idTask)} {Log.F(task)}", LogLevel.Information);

		
		
		await _backupTaskService.Update(idTask, task);

		logger.Exit();

		return NoContent();
	}

	/// <summary>
	///     Delete a mongo backup task configurations
	/// </summary>
	/// <returns></returns>
	[HttpDelete("mongo/{idTask:guid}")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> DeleteMongoTask(Guid idTask)
	{
		var logger = _logger.Enter(Log.F(idTask), LogLevel.Information);

		await _backupTaskService.Delete(idTask);

		logger.Exit();

		return NoContent();
	}
}