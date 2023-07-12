using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using Mapster;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Base;

/// <inheritdoc cref="ICrudRepository{TEntity,TBase}" />
internal class CrudRepository<TEntity, TBase>(IConfiguration configuration, ILogger logger) : BaseRepository<TEntity>(configuration, logger), ICrudRepository<TEntity, TBase> where TEntity : IEntity
{
	public async Task<TEntity> Add(TBase @base)
	{
		using var logger = LogAdapter($"{Log.F(@base)}", autoExit: false);

		var entity = @base!.Adapt<TEntity>();

		await EntityCollection.InsertOneAsync(entity);

		logger.Exit($"{entity.Id}");

		return entity;
	}

	public async Task<TEntity> Replace(ObjectId id, TBase @base)
	{
		using var logger = LogAdapter($"{Log.F(id)} {Log.F(@base)}", autoExit: false);

		var entity = @base!.Adapt<TEntity>();

		entity.Id = id;

		await EntityCollection.ReplaceOneAsync(e => e.Id == id, entity);

		return entity;
	}

	public async Task<List<TEntity>> GetAll()
	{
		using var logger = LogAdapter(autoExit: false);

		var entities = await EntityCollection.AsQueryable().ToListAsync();

		logger.Exit($"{Log.F(entities.Count)}");

		return entities;
	}

	public async Task Delete(ObjectId id)
	{
		using var logger = LogAdapter(autoExit: false);

		var found = await EntityCollection.AsQueryable().Where(e => e.Id == id).ToListAsync();

		var result = await EntityCollection.DeleteOneAsync(e => e.Id == id);

		logger.Exit($"{Log.F(result.DeletedCount)}");
	}

	public async Task<TEntity?> GetById(ObjectId id)
	{
		using var logger = LogAdapter(autoExit: false);

		var found = await EntityCollection.AsQueryable().Where(e => e.Id == id).FirstOrDefaultAsync();

		logger.Exit($"{Log.F(found is not null)}");

		return found;
	}
}