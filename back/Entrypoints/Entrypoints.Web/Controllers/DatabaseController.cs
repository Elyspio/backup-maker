using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers;

/// <summary>
/// Manage database connection and information (databases, collections, sizes)
/// </summary>
[ApiController]
[Route("api/database")]
public class DatabaseController : ControllerBase
{
	private readonly ILogger<DatabaseController> _logger;
	private readonly IMongoDatabaseService _mongoDatabaseService;

	public DatabaseController(IMongoDatabaseService mongoDatabaseService, ILogger<DatabaseController> logger)
	{
		_mongoDatabaseService = mongoDatabaseService;
		_logger = logger;
	}


	/// <summary>
	/// Get informations about databases, collections, sizes for all connections 
	/// </summary>
	/// <returns></returns>
	[HttpGet("infos")]
	[ProducesResponseType(typeof(Dictionary<Guid, List<DatabaseInfo>>), 200)]
	public async Task<IActionResult> GetInfos()
	{
		var logger = _logger.Enter("", LogLevel.Information);

		var connections = await _mongoDatabaseService.GetInfos();

		logger.Exit();

		return Ok(connections);
	}

	/// <summary>
	/// Add a new database connection
	/// </summary>
	/// <param name="req"></param>
	/// <returns></returns>
	[HttpPost("connections")]
	[ProducesResponseType(typeof(List<MongoConnectionData>), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> AddConnection([FromBody] AddMongoConnectionRequest req)
	{
		var logger = _logger.Enter($"{Log.F(req)}", LogLevel.Information);

		await _mongoDatabaseService.AddConnection(req.Name, req.ConnectionString);

		logger.Exit();

		return NoContent();
	}
	
	/// <summary>
	/// Get all databases connections available
	/// </summary>
	/// <returns></returns>
	[HttpGet("connections")]
	[ProducesResponseType(typeof(List<MongoConnectionData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetConnections()
	{
		var logger = _logger.Enter();

		var connections = await _mongoDatabaseService.GetConnections();

		logger.Exit($"{Log.F(connections.Count)}");

		return Ok(connections);
	}	

	
	/// <summary>
	/// Replace the connectionString for a connection
	/// </summary>
	/// <param name="idConnection">Connection's id</param>
	/// <param name="connectionString">new connectionString</param>
	/// <returns></returns>
	[HttpPut("connections/{idConnection:guid}/connection-string")]
	[ProducesResponseType(typeof(List<MongoConnectionData>), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> UpdateConnectionString([FromRoute] Guid idConnection, [FromBody] string connectionString)
	{
		var logger = _logger.Enter($"{Log.F(idConnection)} {Log.F(connectionString)}", LogLevel.Information);

		await _mongoDatabaseService.UpdateConnectionString(idConnection, connectionString);

		logger.Exit();

		return NoContent();
	}		
	/// <summary>
	/// Replace the connectionString for a connection
	/// </summary>
	/// <param name="idConnection">Connection's id</param>
	/// <returns></returns>
	[HttpDelete("connections/{idConnection:guid}")]
	[ProducesResponseType(typeof(List<MongoConnectionData>), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> DeleteConnection([FromRoute] Guid idConnection)
	{
		var logger = _logger.Enter($"{Log.F(idConnection)}", LogLevel.Information);

		await _mongoDatabaseService.DeleteConnection(idConnection);

		logger.Exit();

		return NoContent();
	}	

}