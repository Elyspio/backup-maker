using BackupMaker.Api.Abstractions.Interfaces.Business;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
///     Defines a generic CRUD repository for entities that implement IEntity interface.
/// </summary>
/// <typeparam name="TData"></typeparam>
/// <typeparam name="TBase">type that is used for creating or updating TData</typeparam>
public interface ICrudService<TData, in TBase, TEntity> where TData : ITransport
	where TEntity : IEntity
{
	/// <summary>
	///     Adds a new object to the repository.
	/// </summary>
	/// <param name="base"></param>
	/// <returns>The TData that was added.</returns>
	public Task Add(TBase @base);

	/// <summary>
	///     Replace a single object in the repository.
	/// </summary>
	/// <param name="id"></param>
	/// <param name="base"></param>
	/// <returns>The TData that was added.</returns>
	public Task Replace(Guid id, TBase @base);

	/// <summary>
	///     Fetches all object in the repository.
	/// </summary>
	/// <returns>A List of all TData objects.</returns>
	public Task<List<TData>> GetAll();

	/// <summary>
	///     Deletes a object from the repository.
	/// </summary>
	/// <param name="id">The identifier of the connection.</param>
	/// <returns>A Task representing the asynchronous operation.</returns>
	public Task Delete(Guid id);

	/// <summary>
	///     Fetches a specific object by id.
	/// </summary>
	/// <param name="id">The identifier of the connection.</param>
	/// <returns>The TData with the specified id.</returns>
	public Task<TData> GetById(Guid id);
}