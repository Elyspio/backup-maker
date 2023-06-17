using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Handlers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Hangfire.Handlers;

public class MongoBackupHandler : IJobHandler<BackupMongoLocalJobData>
{
	private readonly ILocalDeploymentService _localDeploymentService;
	private readonly ILogger<MongoBackupHandler> _logger;
	private readonly IMongoBackupTaskService _mongoBackupTaskService;
	private readonly IMongoDatabaseService _mongoDatabaseService;

	public MongoBackupHandler(ILogger<MongoBackupHandler> logger, IMongoDatabaseService mongoDatabaseService, ILocalDeploymentService localDeploymentService, IMongoBackupTaskService mongoBackupTaskService)
	{
		_logger = logger;
		_mongoDatabaseService = mongoDatabaseService;
		_localDeploymentService = localDeploymentService;
		_mongoBackupTaskService = mongoBackupTaskService;
	}


	public async Task Process(BackupMongoLocalJobData payload)
	{
		var logger = _logger.Enter($"{Log.F(payload)}");

		var backupTask = await _mongoBackupTaskService.GetById(payload.IdMongoBackup);

		var archivePath = await _mongoDatabaseService.Backup(backupTask);

		await _localDeploymentService.Deploy(payload.IdLocalDeploy, archivePath);

		logger.Exit();
	}
}