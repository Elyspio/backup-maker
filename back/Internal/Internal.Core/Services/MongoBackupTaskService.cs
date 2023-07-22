using BackupMaker.Api.Abstractions.Interfaces.Repositories.Backup;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Backup;
using BackupMaker.Api.Abstractions.Models.Entities.Backup;
using BackupMaker.Api.Abstractions.Models.Transports.Backup;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc cref="IMongoBackupTaskService" />
internal sealed class MongoBackupTaskService(ILogger<MongoBackupTaskService> logger, IMongoBackupRepository mongoBackupRepository,
	MongoBackupTaskAssembler mongoBackupTaskAssembler) :
	CrudService<MongoBackupTaskData, MongoBackupTaskBase, MongoBackupTaskEntity>(logger, mongoBackupRepository, mongoBackupTaskAssembler), IMongoBackupTaskService;