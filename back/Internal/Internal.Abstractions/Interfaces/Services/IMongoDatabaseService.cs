using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Abstractions.Models.Transports.Responses;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

public interface IMongoDatabaseService
{
	/// <summary>
	///     Get all information
	/// </summary>
	/// <p>	Key = MongoConnectionData.<see cref="MongoConnectionEntity.Id" /></p>
	/// <p> Value = all databases for this connection </p>
	public Task<GetConnectionInformationResponse> GetInfos();


	/// <summary>
	///     Get all databases connections available
	/// </summary>
	/// <returns></returns>
	public Task<List<MongoConnectionData>> GetConnections();

	/// <summary>
	///     Add a new database connection
	/// </summary>
	/// <param name="name">Connection's name</param>
	/// <param name="connectionString">URI to connect to the database</param>
	/// <returns></returns>
	public Task AddConnection(string name, string connectionString);

	/// <summary>
	///     Replace the connectionString for a connection
	/// </summary>
	/// <param name="idConnection">Connection's id</param>
	/// <param name="connectionString">New URI to connect to the database</param>
	/// <returns></returns>
	public Task UpdateConnectionString(Guid idConnection, string connectionString);

	/// <summary>
	///     Replace the connectionString for a connection
	/// </summary>
	/// <param name="idConnection">Connection's id</param>
	/// <param name="connectionString">New URI to connect to the database</param>
	/// <returns></returns>
	public Task DeleteConnection(Guid idConnection);

	public Task Backup(Guid idConnection, Dictionary<string, List<string>> elements);
}