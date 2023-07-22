using BackupMaker.Api.Abstractions.Common.Extensions;
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
internal sealed class LocalDeploymentService(ILocalDeploymentRepository localDeploymentRepository, ILogger<LocalDeploymentService> logger,
	LocalDeployAssembler localDeployAssembler) : CrudService<LocalDeployData, LocalDeployBase, LocalDeployEntity>(logger,
	localDeploymentRepository, localDeployAssembler), ILocalDeploymentService
{
	/// <inheritdoc />
	public async Task Deploy(Guid id, Stream archive, string filename, CancellationToken cancellationToken)
	{
		using var logger = LogService($"{Log.F(id)} {Log.F(archive.Length)} {Log.F(filename)}");

		var deploy = await localDeploymentRepository.GetById(id.AsObjectId());

		if (deploy is null) throw new HttpException.NotFound<LocalDeployEntity>(id);

		Directory.CreateDirectory(deploy.OutputPath);

		var outputFile = Path.Join(deploy.OutputPath, filename);

		await using var fileWriter = File.OpenWrite(outputFile);

		archive.Seek(0, SeekOrigin.Begin);
		await archive.CopyToAsync(fileWriter);

		logger.Debug($"File successfully deployed at {outputFile}");
	}
}