using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Entrypoints.Web.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers.Deploys;

[Route("api/deploys/local/")]
[ApiController]
[Tags("DeploysLocal")]
[Produces("application/json")]
public class LocalDeployController(ILogger<LocalDeployController> logger, ILocalDeploymentService localDeploymentService) : TracingController(logger)
{
	private readonly ILocalDeploymentService _localDeploymentService = localDeploymentService;

	/// <summary>
	///     Get all local deployment configurations
	/// </summary>
	/// <returns></returns>
	[HttpGet("")]
	[ProducesResponseType(typeof(List<LocalDeployData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetLocalDeployments()
	{
		using var _ = LogController();

		var deployments = await _localDeploymentService.GetAll();

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
		using var _ = LogController($"{Log.F(deploy)}");

		await _localDeploymentService.Add(deploy);

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
		using var _ = LogController($"{Log.F(idDeploy)}");

		await _localDeploymentService.Delete(idDeploy);

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
		using var _ = LogController($"{Log.F(idDeploy)} {Log.F(deploy)}");

		await _localDeploymentService.Update(idDeploy, deploy);

		return NoContent();
	}
}