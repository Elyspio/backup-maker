namespace BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

/// <summary>
///     Backup job for a mongo connection
/// </summary>
public class MongoBackupJob
{
	/// <summary>
	///     Id of the mongo connection
	/// </summary>
	public required Guid IdConnection { get; set; }

	/// <summary>
	///     Backup interval with cron format
	/// </summary>
	public required string CronInterval { get; set; }

	/// <summary>
	///     Mapping of a database to a list of collection to backup
	/// </summary>
	public required Dictionary<string, List<string>> Elements { get; set; }
}