using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;
/// <summary>
/// Interface to manage <see cref="LocalDeployData" />
/// </summary>
public interface ILocalDeploymentService
{
	/// <summary>
	/// Fetches all local deployment instances.
	/// </summary>
	/// <returns>A task that represents the asynchronous operation.
	/// The task result contains a list of local deployment data.</returns>
	Task<List<LocalDeployData>> GetAll();

	/// <summary>
	/// Adds a new local deployment configuration.
	/// </summary>
	/// <param name="deploy">The deployment configuration to add.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task Add(LocalDeployBase deploy);

	/// <summary>
	/// Deletes a local deployment configuration.
	/// </summary>
	/// <param name="id">Id of the configuration to delete.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task Delete(Guid id);

	/// <summary>
	/// Deploys the local configuration.
	/// </summary>
	/// <param name="idLocalDeploy">The id of the local deployment to handle.</param>
	/// <param name="archivePath">The path of the archive file to deploy.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task Deploy(Guid idLocalDeploy, string archivePath);

	/// <summary>
	/// Updates a local deployment configuration.
	/// </summary>
	/// <param name="idLocalDeploy">The id of the local deploy configuration to update.</param>
	/// <param name="deploy">The updated deployment configuration.</param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task Update(Guid idLocalDeploy, LocalDeployBase deploy);
}   