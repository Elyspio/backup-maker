using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

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


	public async Task<List<MongoBackupTaskData>> GetAll()
	{
		var logger = _logger.Enter();

		var backups = await _mongoBackupRepository.GetAll();

		logger.Exit();

		return _mongoBackupTaskAssembler.Convert(backups);
	}

	public async Task Add(MongoBackupTask task)
	{
		throw new NotImplementedException();
	}

	public async Task Delete(Guid id)
	{
		throw new NotImplementedException();
	}

	public async Task<MongoBackupTaskData> GetById(Guid id)
	{
		var logger = _logger.Enter();

		var backups = await _mongoBackupRepository.GetById(id);

		logger.Exit();

		return _mongoBackupTaskAssembler.Convert(backups);
	}
}