using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

namespace BackupMaker.Api.Abstractions.Models.Transports;

public class MongoBackupTaskData : MongoBackupTask
{
	/// <summary>
	///     JobDetail's id
	/// </summary>
	public Guid Id { get; set; }
}