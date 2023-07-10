using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Adapters.Mongo.Repositories.Base;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace BackupMaker.Api.Adapters.Mongo.Repositories;

/// <inheritdoc cref="ILocalDeploymentRepository" />
public class MongoBackupRepository : BaseRepository<MongoBackupTaskEntity>, IMongoBackupRepository
{
	/// <inheritdoc />
	public MongoBackupRepository(IConfiguration configuration, ILogger<BaseRepository<MongoBackupTaskEntity>> logger) : base(configuration, logger)
	{
	}

	/// <inheritdoc />
	public async Task<List<MongoBackupTaskEntity>> GetAll()
	{
		using var _ = LogAdapter();

		return await EntityCollection.AsQueryable().ToListAsync();
	}

	/// <inheritdoc />
	public async Task Add(MongoBackupTask deploy)
	{
		using var _ = LogAdapter($"{Log.F(deploy)}");

		var entity = new MongoBackupTaskEntity
		{
			Name = deploy.Name,
			IdConnection = deploy.IdConnection,
			Elements = deploy.Elements
		};
		await EntityCollection.InsertOneAsync(entity);
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		using var _ = LogAdapter($"{Log.F(id)}");

		await EntityCollection.DeleteOneAsync(backup => backup.Id == id.AsObjectId());
	}

	/// <inheritdoc />
	public async Task<MongoBackupTaskEntity> GetById(Guid id)
	{
		using var logger = LogAdapter($"{Log.F(id)}", autoExit: false);

		var entity = await EntityCollection.AsQueryable().FirstOrDefaultAsync(backup => backup.Id == id.AsObjectId());

		logger.Exit($"{Log.F(entity is not null)}");

		return entity;
	}

	/// <inheritdoc />
	public async Task Update(Guid id, MongoBackupTask task)
	{
		using var _ = LogAdapter($"{Log.F(id)} {Log.F(task)}");

		var entity = new MongoBackupTaskEntity
		{
			Id = id.AsObjectId(),
			Name = task.Name,
			IdConnection = task.IdConnection,
			Elements = task.Elements
		};

		await EntityCollection.ReplaceOneAsync(backup => backup.Id == entity.Id, entity);
	}
}