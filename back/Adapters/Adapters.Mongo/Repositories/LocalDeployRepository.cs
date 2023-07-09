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
	public LocalDeployRepository(IConfiguration configuration, ILogger<LocalDeployRepository> logger) : base(configuration, logger)
	{
	}

	/// <inheritdoc />
	public async Task<List<LocalDeployEntity>> GetAll()
	{
		using var _ = LogAdapter();

		var deploys = await EntityCollection.AsQueryable().ToListAsync();

		return deploys;
	}

	/// <inheritdoc />
	public async Task Add(LocalDeployBase deploy)
	{
		using var _ = LogAdapter($"{Log.F(deploy)}");

		var entity = new LocalDeployEntity
		{
			OutputPath = deploy.OutputPath,
			Name = deploy.Name
		};
		await EntityCollection.InsertOneAsync(entity);
	}

	/// <inheritdoc />
	public async Task Delete(Guid id)
	{
		using var _ = LogAdapter($"{Log.F(id)}");

		await EntityCollection.DeleteOneAsync(deploy => deploy.Id == id.AsObjectId());
	}

	/// <inheritdoc />
	public async Task<LocalDeployEntity> GetById(Guid id)
	{
		using var logger = LogAdapter($"{Log.F(id)}", autoExit: false);

		var entity = await EntityCollection.AsQueryable().FirstOrDefaultAsync(deploy => deploy.Id == id.AsObjectId());

		logger.Exit($"{Log.F(entity is not null)}");

		return entity;
	}

	/// <inheritdoc />
	public async Task Update(Guid idLocalDeploy, LocalDeployBase deploy)
	{
		using var _ = LogAdapter($"{Log.F(idLocalDeploy)} {Log.F(deploy)}");

		var entity = new LocalDeployEntity
		{
			Id = idLocalDeploy.AsObjectId(),
			Name = deploy.Name,
			OutputPath = deploy.OutputPath
		};

		await EntityCollection.ReplaceOneAsync(d => d.Id == entity.Id, entity);
	}
}