using Adapters.Authentication;
using BackupMaker.Api.Abstractions.Common.Helpers;
using Elyspio.OpenTelemetry.Tracing.Elements;
using BackupMaker.Api.Abstractions.Interfaces.Services.Deploy;
using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using BackupMaker.Api.Abstractions.Models.Transports.Deploy;
using BackupMaker.Api.Entrypoints.Web.Technical.Filters;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers.Deploys;

/// <summary>
///     Manage FTP deployments
/// </summary>
/// <param name="logger"></param>
/// <param name="ftpDeployService"></param>
[Route("api/deploys/ftp/")]
[ApiController]
[Tags("DeploysFtp")]
[Produces("application/json")]
public sealed class FtpDeployController(ILogger<FtpDeployController> logger, IFtpDeployService ftpDeployService) : TracingController(logger)
{
	/// <summary>
	///     Get all FTP deployment configurations²
	/// </summary>
	/// <returns></returns>
	[HttpGet("")]
	[ProducesResponseType(typeof(List<FtpDeployData>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetFtpDeployment()
	{
		using var _ = LogController();

		var deployments = await ftpDeployService.GetAll();

		return Ok(deployments);
	}


	/// <summary>
	///     Create a new FTP deployment configuration
	/// </summary>
	/// <param name="deploy"></param>
	/// <returns></returns>
	[HttpPost("")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[Authorize(BackupMakerRole.Admin)]
	public async Task<IActionResult> CreateFtpDeploy(FtpDeployBase deploy)
	{
		using var _ = LogController($"{Log.F(deploy)}");

		await ftpDeployService.Add(deploy);

		return NoContent();
	}


	/// <summary>
	///     Delete a FTP deployment configuration
	/// </summary>
	/// <param name="idDeploy"></param>
	/// <returns></returns>
	[Authorize(BackupMakerRole.Admin)]
	[HttpDelete("{idDeploy:guid}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	public async Task<IActionResult> DeleteFtpDeploy(Guid idDeploy)
	{
		using var _ = LogController($"{Log.F(idDeploy)}");

		await ftpDeployService.Delete(idDeploy);

		return NoContent();
	}


	/// <summary>
	///     Replace a FTP deployment configuration
	/// </summary>
	/// <param name="idDeploy">Connection's id</param>
	/// <param name="deploy">new config</param>
	/// <returns></returns>
	[HttpPut("{idDeploy:guid}")]
	[Authorize(BackupMakerRole.Admin)]
	[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> UpdateFtpDeploy([FromRoute] Guid idDeploy, [FromBody] FtpDeployData deploy)
	{
		using var _ = LogController($"{Log.F(idDeploy)} {Log.F(deploy)}");

		await ftpDeployService.Replace(idDeploy, deploy);

		return NoContent();
	}
}