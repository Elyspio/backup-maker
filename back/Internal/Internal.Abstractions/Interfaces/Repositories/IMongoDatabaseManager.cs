using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

/// <summary>
///     Represents an interface for managing MongoDB databases.
/// </summary>
public interface IMongoDatabaseManager
{
	/// <summary>
	///     Retrieves a list of all databases from a MongoDB server using the given connection string.
	/// </summary>
	/// <param name="connectionString">The connection string to the MongoDB server.</param>
	/// <returns>A <see cref="Task" /> that returns a list of <see cref="DatabaseInfo" /> upon completion.</returns>
	Task<List<DatabaseInfo>> GetDatabases(string connectionString);


	/// <summary>
	///     Creates a backup archive for a MongoDB server using the given connection string.
	/// </summary>
	/// <param name="connectionString">The connection string to the MongoDB server.</param>
	/// <param name="elements">
	///     A dictionary of elements to be included in the backup. The key is the database name, and the
	///     value is a list of collection names within that database.
	/// </param>
	/// <param name="cancellationToken"></param>
	/// <returns>A <see cref="Task" /> that returns the backup filepath upon completion.</returns>
	Task<string> Backup(string connectionString, Dictionary<string, List<string>> elements, CancellationToken cancellationToken);
}