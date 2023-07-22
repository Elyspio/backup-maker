using BackupMaker.Api.Abstractions.Interfaces.Repositories.Backup;
using BackupMaker.Api.Abstractions.Interfaces.Repositories.Deploy;
using BackupMaker.Api.Abstractions.Models.Base.Backup;
using BackupMaker.Api.Abstractions.Models.Entities.Backup;
using BackupMaker.Api.Adapters.Mongo.Repositories.Base;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Backup;

/// <inheritdoc cref="ILocalDeploymentRepository" />
internal sealed class MongoBackupRepository
	(IConfiguration configuration, ILogger<MongoBackupRepository> logger) : CrudRepository<MongoBackupTaskEntity, MongoBackupTaskBase>(configuration, logger),
		IMongoBackupRepository
{
}