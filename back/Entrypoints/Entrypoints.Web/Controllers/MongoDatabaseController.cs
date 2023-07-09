using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Abstractions.Models.Transports.Responses;
using BackupMaker.Api.Entrypoints.Web.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers;

/// <summary>
///     Manage database connection and information (databases, collections, sizes)
/// </summary>
[ApiController]
[Route("api/database")]
[Produces("application/json")]
public class MongoDatabaseController(IMongoDatabaseService mongoDatabaseService, ILogger<MongoDatabaseController> logger) : TracingController(logger)
{
	private readonly IMongoDatabaseService _mongoDatabaseService = mongoDatabaseService;

	/// <summary>
	///     Get informations about databases, collections, sizes for all connections
	/// </summary>
	/// <returns></returns>
	[HttpGet("infos")]
	[ProducesResponseType(typeof(GetConnectionInformationResponse), 200)]
	public async Task<IActionResult> GetInfos()
	{
		using var _ = LogController();

		var connections = await _mongoDatabaseService.GetInfos();


		return Ok(connections);
	}

	/// <summary>
	///     Add a new database connection
	/// </summary>
	/// <param name="req"></param>
	/// <returns></returns>
	[HttpPost("connections")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> AddConnection([FromBody] AddMongoConnectionRequest req)
	{
		using var _ = LogController($"{Log.F(req)}");

		await _mongoDatabaseService.AddConnection(req.Name, req.ConnectionString);

		return NoContent();
	}

	/// <summary>
	///     Get all databases connections available
	/// </summary>
	/// <returns></returns>
	[HttpGet("connections")]
	[ProducesResponseType(typeof(List<MongoConnectionData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetConnections()
	{
		using var logger = LogController(autoExit: false);

		var connections = await _mongoDatabaseService.GetConnections();

		logger.Exit($"{Log.F(connections.Count)}");

		return Ok(connections);
	}


	/// <summary>
	///     Replace the connectionString for a connection
	/// </summary>
	/// <param name="idConnection">Connection's id</param>
	/// <param name="connectionString">new connectionString</param>
	/// <returns></returns>
	[HttpPut("connections/{idConnection:guid}/connection-string")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> UpdateConnectionString([FromRoute] Guid idConnection, [FromBody] string connectionString)
	{
		using var _ = LogController($"{Log.F(idConnection)} {Log.F(connectionString)}");

		await _mongoDatabaseService.UpdateConnectionString(idConnection, connectionString);

		return NoContent();
	}

	/// <summary>
	///     Replace the connectionString for a connection
	/// </summary>
	/// <param name="idConnection">Connection's id</param>
	/// <returns></returns>
	[HttpDelete("connections/{idConnection:guid}")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> DeleteConnection([FromRoute] Guid idConnection)
	{
		using var _ = LogController($"{Log.F(idConnection)}");

		await _mongoDatabaseService.DeleteConnection(idConnection);

		return NoContent();
	}
}