using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Adapters.Mongo.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace BackupMaker.Api.Adapters.Mongo.Repositories;

/// <inheritdoc cref="ILocalDeploymentRepository" />
public class LocalDeployRepository : BaseRepository<LocalDeployEntity>, ILocalDeploymentRepository
{
	/// <inheritdoc />
	public LocalDeployRepository(IConfiguration configuration, ILogger<BaseRepository<LocalDeployEntity>> logger) : base(configuration, logger)
	{
	}

	/// <inheritdoc />
	public async Task<List<LocalDeployEntity>> GetAll()
	{
		var logger = _logger.Enter();

		var deploys = await EntityCollection.AsQueryable().ToListAsync();

		logger.Exit();

		return deploys;
	}

	/// <inheritdoc />
	public async Task Add(LocalDeployBase deploy)
	{
		var logger = _logger.Enter($"{Log.F(deploy)}");

		var entity = new LocalDeployEntity
		{
			OutputPath = deploy.OutputPath,
			Name = deploy.Name
		};
		await EntityCollection.InsertOneAsync(entity);

		logger.Exit();
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		var logger = _logger.Enter($"{Log.F(id)}");

		await EntityCollection.DeleteOneAsync(deploy => deploy.Id == id.AsObjectId());

		logger.Exit();
	}

	/// <inheritdoc />
	public async Task<LocalDeployEntity> GetById(Guid id)
	{
		var logger = _logger.Enter($"{Log.F(id)}");

		var entity = await EntityCollection.AsQueryable().FirstOrDefaultAsync(deploy => deploy.Id == id.AsObjectId());

		logger.Exit($"{Log.F(entity is not null)}");

		return entity;
	}

	/// <inheritdoc />
	public async Task Update(Guid idLocalDeploy, LocalDeployBase deploy)
	{
		var logger = _logger.Enter($"{Log.F(idLocalDeploy)} {Log.F(deploy)}");

		var entity = new LocalDeployEntity
		{
			Id = idLocalDeploy.AsObjectId(),
			Name = deploy.Name,
			OutputPath = deploy.OutputPath
		};

		await EntityCollection.ReplaceOneAsync(d => d.Id == entity.Id, entity);

		logger.Exit();
	}
}