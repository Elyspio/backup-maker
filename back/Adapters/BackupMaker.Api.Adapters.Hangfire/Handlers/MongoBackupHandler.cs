using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Handlers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Hangfire.Handlers;

public class MongoBackupHandler : IJobHandler<MongoBackupJob>
{
	private readonly ILogger<MongoBackupHandler> _logger;

	private readonly IMongoDatabaseService _mongoDatabaseService;

	public MongoBackupHandler(ILogger<MongoBackupHandler> logger, IMongoDatabaseService mongoDatabaseService)
	{
		_logger = logger;
		_mongoDatabaseService = mongoDatabaseService;
	}


	public async Task Process(MongoBackupJob payload)
	{
		var logger = _logger.Enter($"{Log.F(payload.IdConnection)} {Log.F(payload.CronInterval)}");

		await _mongoDatabaseService.Backup(payload.IdConnection, payload.Elements);

		logger.Exit();
	}
}