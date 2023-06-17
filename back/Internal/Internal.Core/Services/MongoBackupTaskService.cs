using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc />
public class MongoBackupTaskService : IMongoBackupTaskService
{
	private readonly ILogger<MongoBackupTaskService> _logger;
	private readonly IMongoBackupRepository _mongoBackupRepository;
	private readonly MongoBackupTaskAssembler _mongoBackupTaskAssembler;

	public MongoBackupTaskService(IMongoBackupRepository mongoBackupRepository, ILogger<MongoBackupTaskService> logger, MongoBackupTaskAssembler mongoBackupTaskAssembler)
	{
		_logger = logger;
		_mongoBackupRepository = mongoBackupRepository;
		_mongoBackupTaskAssembler = mongoBackupTaskAssembler;
	}


	/// <inheritdoc />
	public async Task<List<MongoBackupTaskData>> GetAll()
	{
		var logger = _logger.Enter();

		var backups = await _mongoBackupRepository.GetAll();

		logger.Exit();

		return _mongoBackupTaskAssembler.Convert(backups);
	}

	/// <inheritdoc />
	public async Task Add(MongoBackupTask task)
	{
		var logger = _logger.Enter(Log.F(task));

		await _mongoBackupRepository.Add(task);

		logger.Exit();
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		var logger = _logger.Enter();

		await _mongoBackupRepository.Delete(id);

		logger.Exit();
	}

	/// <inheritdoc />
	public async Task<MongoBackupTaskData> GetById(Guid id)
	{
		var logger = _logger.Enter($"{Log.F(id)}");

		var backups = await _mongoBackupRepository.GetById(id);

		logger.Exit();

		return _mongoBackupTaskAssembler.Convert(backups);
	}

	/// <inheritdoc />
	public async Task Update(Guid id, MongoBackupTask task)
	{
		var logger = _logger.Enter($"{Log.F(id)} {Log.F(task)}");

		await _mongoBackupRepository.Update(id, task);

		logger.Exit();
	}
}