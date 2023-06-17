using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Entities;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

/// <summary>
///     Manage <see cref="LocalDeployEntity" /> entity in MongoDB
/// </summary>
public interface ILocalDeploymentRepository
{
	/// <summary>
	///     Get all local deployment
	/// </summary>
	/// <returns></returns>
	Task<List<LocalDeployEntity>> GetAll();

	/// <summary>
	///     Add a new local deployment configuration
	/// </summary>
	/// <param name="deploy"></param>
	/// <returns></returns>
	Task Add(LocalDeployBase deploy);


	/// <summary>
	///     Delete a local deployment configuration
	/// </summary>
	/// <param name="id">Id of the configuration</param>
	/// <returns></returns>
	Task Delete(Guid id);

	/// <summary>
	///     Get a local deployment
	/// </summary>
	/// <returns></returns>
	Task<LocalDeployEntity> GetById(Guid id);

	/// <summary>
	///     Update a local deployment configuration
	/// </summary>
	/// <param name="idLocalDeploy"></param>
	/// <param name="deploy"></param>
	/// <returns></returns>
	Task Update(Guid idLocalDeploy, LocalDeployBase deploy);
}