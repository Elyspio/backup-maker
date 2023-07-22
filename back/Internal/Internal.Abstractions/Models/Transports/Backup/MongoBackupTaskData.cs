using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Base.Backup;

namespace BackupMaker.Api.Abstractions.Models.Transports.Backup;

/// <summary>
///     Represents a data model used for MongoDB backup task-related operations.
/// </summary>
public sealed class MongoBackupTaskData : MongoBackupTaskBase, ITransport
{
	/// <summary>
	///     Gets or sets the unique identifier (ID) of the job detail associated with this MongoBackupTaskBase.
	/// </summary>
	public required Guid Id { get; init; }
}