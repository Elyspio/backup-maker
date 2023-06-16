using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;
using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Adapters.Mongo.Repositories.Internal;
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
		var logger = _logger.Enter();

		var deploys = await EntityCollection.AsQueryable().ToListAsync();

		logger.Exit();

		return deploys;
	}

	/// <inheritdoc />
	public async Task Add(MongoBackupTask deploy)
	{
		var logger = _logger.Enter($"{Log.F(deploy)}");

		var entity = new MongoBackupTaskEntity
		{
			IdConnection = deploy.IdConnection,
			Elements = deploy.Elements
		};
		await EntityCollection.InsertOneAsync(entity);

		logger.Exit();
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		var logger = _logger.Enter($"{Log.F(id)}");

		await EntityCollection.DeleteOneAsync(backup => backup.Id == id.AsObjectId());

		logger.Exit();
	}

	public async Task<MongoBackupTaskEntity> GetById(Guid id)
	{
		var logger = _logger.Enter($"{Log.F(id)}");

		var entity = await EntityCollection.AsQueryable().FirstOrDefaultAsync(backup => backup.Id == id.AsObjectId());

		logger.Exit($"{Log.F(entity is not null)}");

		return entity;
	}
}