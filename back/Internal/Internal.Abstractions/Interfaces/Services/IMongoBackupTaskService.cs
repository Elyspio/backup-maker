using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Transports;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
/// An interface for managing the backup tasks pertaining to MongoDB.
/// </summary>
/// <remarks>
/// The primary responsibilities of this interface are to provide an 
/// abstraction for performing various operations such as fetching,
/// adding, deleting, and updating MongoDB backup configurations.
/// </remarks>
public interface IMongoBackupTaskService
{
	/// <summary>
	/// Asynchronously retrieves all MongoDB backup configurations.
	/// </summary>
	/// <returns>A task that results in a list of MongoDB backup configurations.</returns>
	Task<List<MongoBackupTaskData>> GetAll();

	/// <summary>
	/// Asynchronously adds a new MongoDB backup configuration.
	/// </summary>
	/// <param name="task">The MongoDB backup task to add.</param>
	/// <returns>A task representing the asynchronous operation.</returns>
	Task Add(MongoBackupTask task);

	/// <summary>
	/// Asynchronously deletes a MongoDB backup configuration.
	/// </summary>
	/// <param name="id">The unique identifier of the MongoDB backup configuration to delete.</param>
	/// <returns>A task representing the asynchronous operation.</returns>
	Task Delete(Guid id);

	/// <summary>
	/// Asynchronously retrieves a MongoDB backup configuration.
	/// </summary>
	/// <param name="id">The unique identifier of the MongoDB backup task.</param>
	/// <returns>A task that results in a MongoDB backup configuration.</returns>
	Task<MongoBackupTaskData> GetById(Guid id);

	/// <summary>
	/// Asynchronously updates a MongoDB backup configuration.
	/// </summary>
	/// <param name="id">The unique identifier of the MongoDB backup configuration to update.</param>
	/// <param name="task">The new MongoDB backup task.</param>
	/// <returns>A task representing the asynchronous operation.</returns>
	Task Update(Guid id, MongoBackupTask task);
}