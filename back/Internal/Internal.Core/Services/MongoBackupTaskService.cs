using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Transports;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

/// <inheritdoc />
public class MongoBackupTaskService(IMongoBackupRepository mongoBackupRepository, ILogger<MongoBackupTaskService> logger, MongoBackupTaskAssembler mongoBackupTaskAssembler) : TracingContext(logger), IMongoBackupTaskService
{
	private readonly ILogger<MongoBackupTaskService> _logger = logger;
	private readonly IMongoBackupRepository _mongoBackupRepository = mongoBackupRepository;
	private readonly MongoBackupTaskAssembler _mongoBackupTaskAssembler = mongoBackupTaskAssembler;


	/// <inheritdoc />
	public async Task<List<MongoBackupTaskData>> GetAll()
	{
		using var _ = LogService();

		var backups = await _mongoBackupRepository.GetAll();

		return _mongoBackupTaskAssembler.Convert(backups);
	}

	/// <inheritdoc />
	public async Task Add(MongoBackupTask task)
	{
		using var _ = LogService(Log.F(task));

		await _mongoBackupRepository.Add(task);
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		using var _ = LogService();

		await _mongoBackupRepository.Delete(id);
	}

	/// <inheritdoc />
	public async Task<MongoBackupTaskData> GetById(Guid id)
	{
		using var _ = LogService($"{Log.F(id)}");

		var backups = await _mongoBackupRepository.GetById(id);

		return _mongoBackupTaskAssembler.Convert(backups);
	}

	/// <inheritdoc />
	public async Task Update(Guid id, MongoBackupTask task)
	{
		using var _ = LogService($"{Log.F(id)} {Log.F(task)}");

		await _mongoBackupRepository.Update(id, task);
	}
}