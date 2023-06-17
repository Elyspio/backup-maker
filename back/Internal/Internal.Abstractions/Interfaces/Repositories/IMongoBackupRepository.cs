using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Entities;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

/// <summary>
///     Manage <see cref="MongoBackupTaskEntity" />
/// </summary>
public interface IMongoBackupRepository
{
	/// <summary>
	///     Get all mongo backup configuration
	/// </summary>
	/// <returns></returns>
	Task<List<MongoBackupTaskEntity>> GetAll();

	/// <summary>
	///     Add a mongo backup configuration
	/// </summary>
	/// <param name="deploy"></param>
	/// <returns></returns>
	Task Add(MongoBackupTask deploy);


	/// <summary>
	///     Delete a mongo backup configuration
	/// </summary>
	/// <param name="id">Id of the configuration</param>
	/// <returns></returns>
	Task Delete(Guid id);

	/// <summary>
	///     Get a mongo backup configuration
	/// </summary>
	/// <param name="id"></param>
	/// <returns></returns>
	Task<MongoBackupTaskEntity> GetById(Guid id);

	Task Update(Guid id, MongoBackupTask task);
}