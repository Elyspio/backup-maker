using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc />
public class LocalDeploymentService(ILocalDeploymentRepository localDeploymentRepository, ILogger<LocalDeploymentService> logger, LocalDeployAssembler localDeployAssembler) : TracingContext(logger), ILocalDeploymentService
{
	private readonly LocalDeployAssembler _localDeployAssembler = localDeployAssembler;
	private readonly ILocalDeploymentRepository _localDeploymentRepository = localDeploymentRepository;
	private readonly ILogger<LocalDeploymentService> _logger = logger;


	/// <inheritdoc />
	public async Task<List<LocalDeployData>> GetAll()
	{
		using var _ = LogService();

		var deploys = await _localDeploymentRepository.GetAll();

		return _localDeployAssembler.Convert(deploys);
	}

	/// <inheritdoc />
	public async Task Add(LocalDeployBase deploy)
	{
		using var _ = LogService($"{Log.F(deploy)}");

		await _localDeploymentRepository.Add(deploy);
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		using var _ = LogService($"{Log.F(id)}");

		await _localDeploymentRepository.Delete(id);
	}

	public async Task Deploy(Guid idLocalDeploy, string archivePath)
	{
		using var _ = LogService($"{Log.F(idLocalDeploy)} {Log.F(archivePath)}");

		var deploy = await _localDeploymentRepository.GetById(idLocalDeploy);

		var archiveName = Path.GetFileName(archivePath);

		await FileHelper.CopyFileAsync(archivePath, Path.Join(deploy.OutputPath, archiveName));
	}

	/// <inheritdoc />
	public async Task Update(Guid idLocalDeploy, LocalDeployBase deploy)
	{
		using var _ = LogService($"{Log.F(idLocalDeploy)} {Log.F(deploy)}");

		await _localDeploymentRepository.Update(idLocalDeploy, deploy);
	}
}