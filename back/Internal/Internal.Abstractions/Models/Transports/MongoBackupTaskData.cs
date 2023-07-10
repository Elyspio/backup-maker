using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

namespace BackupMaker.Api.Abstractions.Models.Transports;

/// <summary>
/// Represents a data model used for MongoDB backup task-related operations.
/// </summary>
public class MongoBackupTaskData : MongoBackupTask
{
	/// <summary>
	/// Gets or sets the unique identifier (ID) of the job detail associated with this MongoBackupTask.
	/// </summary>
	public required Guid Id { get; set; }
}