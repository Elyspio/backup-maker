using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Handlers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Hangfire.Handlers;

public class MongoBackupHandler(ILogger<MongoBackupHandler> logger, IMongoDatabaseService mongoDatabaseService, ILocalDeploymentService localDeploymentService, IMongoBackupTaskService mongoBackupTaskService) : IJobHandler
{
	private readonly ILocalDeploymentService _localDeploymentService = localDeploymentService;
	private readonly ILogger<MongoBackupHandler> _logger = logger;
	private readonly IMongoBackupTaskService _mongoBackupTaskService = mongoBackupTaskService;
	private readonly IMongoDatabaseService _mongoDatabaseService = mongoDatabaseService;


	public async Task Process(JobData payload)
	{
		using var _ = _logger.Enter($"{Log.F(payload)}");

		// var backupTask = await _mongoBackupTaskService.GetById(payload.IdMongoTask);
		//
		// var archivePath = await _mongoDatabaseService.Backup(backupTask);
		//
		// await _localDeploymentService.Deploy(payload.IdLocalDeploy, archivePath);
	}
}