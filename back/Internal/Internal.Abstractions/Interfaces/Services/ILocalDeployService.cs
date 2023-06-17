using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
///     Manage <see cref="LocalDeployData" />
/// </summary>
public interface ILocalDeploymentService
{
	/// <summary>
	///     Get all local deployment
	/// </summary>
	/// <returns></returns>
	Task<List<LocalDeployData>> GetAll();

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

	Task Deploy(Guid idLocalDeploy, string archivePath);

	/// <summary>
	///     Update a local deployment configuration
	/// </summary>
	/// <param name="idLocalDeploy"></param>
	/// <param name="deploy"></param>
	Task Update(Guid idLocalDeploy, LocalDeployBase deploy);
}