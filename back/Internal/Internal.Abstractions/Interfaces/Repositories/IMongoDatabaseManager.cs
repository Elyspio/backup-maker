using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

public interface IMongoDatabaseManager
{
	Task<List<DatabaseInfo>> GetDatabases(string connectionString);
}