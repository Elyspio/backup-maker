using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc />
public class LocalDeploymentService : ILocalDeploymentService
{
	private readonly LocalDeployAssembler _localDeployAssembler;
	private readonly ILocalDeploymentRepository _localDeploymentRepository;
	private readonly ILogger<LocalDeploymentService> _logger;

	/// <summary>
	/// </summary>
	/// <param name="localDeploymentRepository"></param>
	/// <param name="logger"></param>
	/// <param name="localDeployAssembler"></param>
	public LocalDeploymentService(ILocalDeploymentRepository localDeploymentRepository, ILogger<LocalDeploymentService> logger, LocalDeployAssembler localDeployAssembler)
	{
		_localDeploymentRepository = localDeploymentRepository;
		_logger = logger;
		_localDeployAssembler = localDeployAssembler;
	}


	/// <inheritdoc />
	public async Task<List<LocalDeployData>> GetAll()
	{
		var logger = _logger.Enter();

		var deploys = await _localDeploymentRepository.GetAll();

		logger.Exit();

		return _localDeployAssembler.Convert(deploys);
	}

	/// <inheritdoc />
	public async Task Add(LocalDeployBase deploy)
	{
		var logger = _logger.Enter($"{Log.F(deploy)}");

		await _localDeploymentRepository.Add(deploy);

		logger.Exit();
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		var logger = _logger.Enter($"{Log.F(id)}");

		await _localDeploymentRepository.Delete(id);

		logger.Exit();
	}

	public async Task Deploy(Guid idLocalDeploy, string archivePath)
	{
		var logger = _logger.Enter($"{Log.F(idLocalDeploy)} {Log.F(archivePath)}");

		var deploy = await _localDeploymentRepository.GetById(idLocalDeploy);

		var archiveName = Path.GetFileName(archivePath);

		await FileHelper.CopyFileAsync(archivePath, Path.Join(deploy.OutputPath, archiveName));

		logger.Exit();
	}

	/// <inheritdoc />
	public async Task Update(Guid idLocalDeploy, LocalDeployBase deploy)
	{
		var logger = _logger.Enter($"{Log.F(idLocalDeploy)} {Log.F(deploy)}");

		await _localDeploymentRepository.Update(idLocalDeploy, deploy);

		logger.Exit();
	}
}