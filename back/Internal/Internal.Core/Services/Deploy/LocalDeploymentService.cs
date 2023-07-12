﻿using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Exceptions;
using BackupMaker.Api.Abstractions.Interfaces.Repositories.Deploy;
using BackupMaker.Api.Abstractions.Interfaces.Services.Deploy;
using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Entities.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports.Deploy;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services.Deploy;

/// <inheritdoc cref="ILocalDeploymentService" />
internal class LocalDeploymentService(ILocalDeploymentRepository localDeploymentRepository, ILogger<LocalDeploymentService> logger, LocalDeployAssembler localDeployAssembler) : CrudService<LocalDeployData, LocalDeployBase, LocalDeployEntity>(logger,
	localDeploymentRepository, localDeployAssembler), ILocalDeploymentService
{
	/// <inheritdoc />
	public async Task Deploy(Guid id, Stream archive, string filename)
	{
		using var _ = LogService($"{Log.F(id)} {Log.F(archive)}");

		var deploy = await localDeploymentRepository.GetById(id.AsObjectId());

		if (deploy is null) throw new HttpException.NotFound<LocalDeployEntity>(id);

		await using var fileWriter = File.OpenWrite(Path.Join(deploy.OutputPath, filename));

		await archive.CopyToAsync(fileWriter);
	}
}