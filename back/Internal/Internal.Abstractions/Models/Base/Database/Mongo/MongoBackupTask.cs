using BackupMaker.Api.Abstractions.Models.Base.Backup;

namespace BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

/// <summary>
///     Backup job for a mongo connection
/// </summary>
public class MongoBackupTask : BaseBackupTask
{
	/// <summary>
	///     Id of the mongo connection
	/// </summary>
	public required Guid IdConnection { get; init; }

	/// <summary>
	///     Mapping of a database to a list of collection to backup
	/// </summary>
	public required Dictionary<string, List<string>> Elements { get; init; }
}