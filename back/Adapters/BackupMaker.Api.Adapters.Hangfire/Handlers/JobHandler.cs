using BackupMaker.Api.Abstractions.Interfaces.Clients;
using BackupMaker.Api.Abstractions.Interfaces.Handlers;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Interfaces.Services.Deploy;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Hangfire.Handlers;

public class JobHandler(ILogger<JobHandler> logger, IMongoDatabaseService mongoDatabaseService, ILocalDeploymentService localDeploymentService, IMongoBackupTaskService mongoBackupTaskService, IFtpClient ftpClient) : IJobHandler
{
}