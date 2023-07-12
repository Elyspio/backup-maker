using BackupMaker.Api.Abstractions.Models.Base.Backup;
using BackupMaker.Api.Abstractions.Models.Transports.Connections;
using BackupMaker.Api.Abstractions.Models.Transports.Responses;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
///     Provides services for interacting with a Mongo database.
/// </summary>
public interface IMongoDatabaseService
{
	/// <summary>
	///     Gets all information related to the service.
	/// </summary>
	/// <returns>A task that represents the asynchronous operation. The task result contains the connection information.</returns>
	public Task<GetConnectionInformationResponse> GetInfos();


	/// <summary>
	///     Gets all the database connections available.
	/// </summary>
	/// <returns>
	///     A task that represents the asynchronous operation. The task result contains a list of connections to MongoDB
	///     databases.
	/// </returns>
	public Task<List<MongoConnectionData>> GetConnections();

	/// <summary>
	///     Adds a new database connection.
	/// </summary>
	/// <param name="name">The name of the new connection.</param>
	/// <param name="connectionString">The connection string used to connect to the MongoDB Database.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	public Task AddConnection(string name, string connectionString);

	/// <summary>
	///     Updates the connection string of a specific connection.
	/// </summary>
	/// <param name="idConnection">The identifier of the connection to be updated.</param>
	/// <param name="connectionString">The new connection string to be used for the connection.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	public Task UpdateConnectionString(Guid idConnection, string connectionString);

	/// <summary>
	///     Deletes a specific connection.
	/// </summary>
	/// <param name="idConnection">The identifier of the connection to be deleted.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	public Task DeleteConnection(Guid idConnection);

	/// <summary>
	///     Creates a backup of a MongoDB database based on a backup task configuration.
	/// </summary>
	/// <param name="task">The backup task configuration details.</param>
	/// <returns>The archive as stream</returns>
	public Task<Stream> Backup(MongoBackupTaskBase task);
}