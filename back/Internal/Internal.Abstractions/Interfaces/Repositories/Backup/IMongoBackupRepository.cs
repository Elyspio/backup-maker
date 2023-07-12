using BackupMaker.Api.Abstractions.Models.Base.Backup;
using BackupMaker.Api.Abstractions.Models.Entities.Backup;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories.Backup;

/// <summary>
///     Manage <see cref="MongoBackupTaskEntity" />
/// </summary>
public interface IMongoBackupRepository : ICrudRepository<MongoBackupTaskEntity, MongoBackupTaskBase>;