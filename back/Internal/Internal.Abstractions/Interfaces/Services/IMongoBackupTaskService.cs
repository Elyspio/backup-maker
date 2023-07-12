using BackupMaker.Api.Abstractions.Models.Base.Backup;
using BackupMaker.Api.Abstractions.Models.Entities.Backup;
using BackupMaker.Api.Abstractions.Models.Transports.Backup;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
///     An interface for managing the backup tasks pertaining to MongoDB.
/// </summary>
/// <remarks>
///     The primary responsibilities of this interface are to provide an
///     abstraction for performing various operations such as fetching,
///     adding, deleting, and updating MongoDB backup configurations.
/// </remarks>
public interface IMongoBackupTaskService : ICrudService<MongoBackupTaskData, MongoBackupTaskBase, MongoBackupTaskEntity>
{
}