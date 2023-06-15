using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

public interface IMongoDatabaseManager
{
	Task<List<DatabaseInfo>> GetDatabases(string connectionString);


	/// <summary>
	///     Create a backup archive for a mongo connection
	/// </summary>
	/// <returns></returns>
	Task<string> Backup(string connectionString, Dictionary<string, List<string>> elements);
}