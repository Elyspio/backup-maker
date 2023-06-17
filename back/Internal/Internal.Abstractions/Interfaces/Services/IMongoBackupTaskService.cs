using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Transports;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
///     Manage <see cref="LocalDeployData" />
/// </summary>
public interface IMongoBackupTaskService
{
	/// <summary>
	///     Get all mongo backup configuration
	/// </summary>
	/// <returns></returns>
	Task<List<MongoBackupTaskData>> GetAll();

	/// <summary>
	///     Add a new mongo backup configuration
	/// </summary>
	/// <param name="task"></param>
	/// <returns></returns>
	Task Add(MongoBackupTask task);


	/// <summary>
	///     Delete a mongo backup configuration
	/// </summary>
	/// <param name="id">Id of the configuration</param>
	/// <returns></returns>
	Task Delete(Guid id);

	/// <summary>
	///     Get a mongo backup configuration
	/// </summary>
	/// <param name="id">Mongo task's id</param>
	/// <returns></returns>
	Task<MongoBackupTaskData> GetById(Guid id);

	/// <summary>
	///     Replace a mongo backup configuration
	/// </summary>
	/// <param name="id">Id of the configuration</param>
	/// <param name="task">New configuration</param>
	/// <returns></returns>
	Task Update(Guid id, MongoBackupTask task);
}