using BackupMaker.Api.Abstractions.Common.Assemblers;
using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Exceptions;
using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services;

internal class CrudService<TData, TBase, TEntity> : TracingContext, ICrudService<TData, TBase, TEntity>
	where TData : ITransport
	where TEntity : IEntity
{
	private readonly IBaseAssembler<TData, TEntity> _baseAssembler;
	private readonly ICrudRepository<TEntity, TBase> _crudRepository;

	protected CrudService(ILogger logger, ICrudRepository<TEntity, TBase> repository, IBaseAssembler<TData, TEntity> baseAssembler) : base(logger)
	{
		_crudRepository = repository;
		_baseAssembler = baseAssembler;
	}


	public async Task Add(TBase @base)
	{
		using var _ = LogService($"{Log.F(@base)}");

		await _crudRepository.Add(@base);
	}

	public async Task Replace(Guid id, TBase @base)
	{
		using var _ = LogService($"{Log.F(id)} {Log.F(@base)}");

		await _crudRepository.Replace(id.AsObjectId(), @base);
	}

	public async Task<List<TData>> GetAll()
	{
		using var _ = LogService();

		var entities = await _crudRepository.GetAll();

		return _baseAssembler.Convert(entities);
	}

	public async Task Delete(Guid id)
	{
		using var _ = LogService($"{Log.F(id)}");

		await _crudRepository.Delete(id.AsObjectId());
	}

	public async Task<TData> GetById(Guid id)
	{
		using var _ = LogService();

		var entity = await _crudRepository.GetById(id.AsObjectId());

		if (entity is null) throw new HttpException.NotFound<TEntity>(id);

		return _baseAssembler.Convert(entity);
	}
}