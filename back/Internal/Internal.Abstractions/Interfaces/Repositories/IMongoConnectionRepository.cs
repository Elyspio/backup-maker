using BackupMaker.Api.Abstractions.Models.Entities;
using MongoDB.Bson;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

/// <summary>
/// Represents Mongo database connection operations. 
/// </summary>
public interface IMongoConnectionRepository
{
	/// <summary>
	/// Adds a new connection to the repository.
	/// </summary>
	/// <param name="name">The name of the connection.</param>
	/// <param name="connectionString">The connection string of the database.</param>
	/// <returns>The MongoConnectionEntity that was added.</returns>
	public Task<MongoConnectionEntity> Add(string name, string connectionString);

	/// <summary>
	/// Fetches all connections in the repository.
	/// </summary>
	/// <returns>A List of all MongoConnectionEntity objects.</returns>
	public Task<List<MongoConnectionEntity>> GetAll();

	/// <summary>
	/// Updates an existing database connection.
	/// </summary>
	/// <param name="idDatabase">The identifier of the database.</param>
	/// <param name="connectionString">The connection string of the database.</param>
	/// <returns>The updated MongoConnectionEntity.</returns>
	public Task<MongoConnectionEntity> Update(ObjectId idDatabase, string connectionString);
	
	/// <summary>
	/// Deletes a database connection from the repository.
	/// </summary>
	/// <param name="idConnection">The identifier of the connection.</param>
	/// <returns>A Task representing the asynchronous operation.</returns>
	public Task Delete(ObjectId idConnection);

	/// <summary>
	/// Fetches a specific database connection by id.
	/// </summary>
	/// <param name="idConnection">The identifier of the connection.</param>
	/// <returns>The MongoConnectionEntity with the specified id.</returns>
	public Task<MongoConnectionEntity> GetById(Guid idConnection);
}