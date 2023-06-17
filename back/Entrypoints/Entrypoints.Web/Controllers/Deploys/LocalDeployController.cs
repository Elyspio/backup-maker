using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers.Tasks;

[Route("api/deploys/local/")]
[ApiController]
[Tags("DeploysLocal")]
[Produces("application/json")]
public class LocalDeployController : ControllerBase
{
	private readonly ILocalDeploymentService _localDeploymentService;

	private readonly ILogger<LocalDeployController> _logger;

	public LocalDeployController(ILogger<LocalDeployController> logger, ILocalDeploymentService localDeploymentService)
	{
		_logger = logger;
		_localDeploymentService = localDeploymentService;
	}

	/// <summary>
	///     Get all local deployment configurations
	/// </summary>
	/// <returns></returns>
	[HttpGet("")]
	[ProducesResponseType(typeof(List<LocalDeployData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetLocalDeployments()
	{
		var logger = _logger.Enter();

		var deployments = await _localDeploymentService.GetAll();

		logger.Exit();

		return Ok(deployments);
	}


	/// <summary>
	///     Create a new local deployment configuration
	/// </summary>
	/// <param name="deploy"></param>
	/// <returns></returns>
	[HttpPost("")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> CreateLocalDeploy(LocalDeployBase deploy)
	{
		var logger = _logger.Enter($"{Log.F(deploy)}", LogLevel.Information);

		await _localDeploymentService.Add(deploy);

		logger.Exit();


		return NoContent();
	}


	/// <summary>
	///     Delete a local deployment configuration
	/// </summary>
	/// <param name="idDeploy"></param>
	/// <returns></returns>
	[HttpDelete("{idDeploy:guid}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> DeleteLocalDeploy(Guid idDeploy)
	{
		var logger = _logger.Enter($"{Log.F(idDeploy)}", LogLevel.Information);

		await _localDeploymentService.Delete(idDeploy);

		logger.Exit();

		return NoContent();
	}


	/// <summary>
	///     Replace a local deployment configuration
	/// </summary>
	/// <param name="idDeploy">Connection's id</param>
	/// <param name="deploy">new config</param>
	/// <returns></returns>
	[HttpPut("{idDeploy:guid}")]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> UpdateLocalDeploy([FromRoute] Guid idDeploy, [FromBody] LocalDeployBase deploy)
	{
		var logger = _logger.Enter($"{Log.F(idDeploy)} {Log.F(deploy)}", LogLevel.Information);

		await _localDeploymentService.Update(idDeploy, deploy);

		logger.Exit();

		return NoContent();
	}
}