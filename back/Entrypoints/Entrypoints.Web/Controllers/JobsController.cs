using BackupMaker.Api.Adapters.Hangfire.Handlers;
using Hangfire;
using Microsoft.AspNetCore.Mvc;

namespace BackupMaker.Api.Entrypoints.Web.Controllers;

[Route("/jobs")]
[ApiController]
public class JobsController : ControllerBase
{
	[HttpPost("start")]
	public async Task<IActionResult> Start()
	{
		RecurringJob.AddOrUpdate<MongoBackupHandler>("myjob", job => job.Process(new()
		{
			IdConnection = Guid.Parse("f6e18464-1ff3-409d-5386-c00a05050505"),
			CronInterval = "null",
			Elements = new()
			{
				{
					"dad-switch-virtualizer", new()
					{
						"History",
						"PortType"
					}
				},
				{
					"backup-maker", new()
					{
						"MongoConnection"
					}
				},
				{
					"coexya-sous-marin-jaune", new()
					{
						"Config",
						"Order"
					}
				},
				{
					"app-updater", new()
					{
						"Apps",
						"Apps.chunks",
						"Apps.files"
					}
				}
			}
		}), Cron.Daily);
		return Ok();
	}
}