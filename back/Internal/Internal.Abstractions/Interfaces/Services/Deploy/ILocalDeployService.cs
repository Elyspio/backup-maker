﻿using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports.Deploy;

namespace BackupMaker.Api.Abstractions.Interfaces.Services.Deploy;

/// <summary>
///     Interface to manage <see cref="LocalDeployData" />
/// </summary>
public interface ILocalDeploymentService : ICrudService<LocalDeployData, LocalDeployBase>
{
	/// <summary>
	///     Deploys the local configuration.
	/// </summary>
	/// <param name="id">The id of the local deployment to handle.</param>
	/// <param name="archive">The Stream of the archive file to deploy.</param>
	/// <param name="filename"></param>
	/// <param name="cancellationToken"></param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task Deploy(Guid id, Stream archive, string filename, CancellationToken cancellationToken);
}