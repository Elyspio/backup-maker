using BackupMaker.Api.Abstractions.Models.Entities;
using MongoDB.Bson;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

public interface IMongoConnectionRepository
{
	public Task<MongoConnectionEntity> Add(string name, string connectionString);

	public Task<List<MongoConnectionEntity>> GetAll();

	public Task<MongoConnectionEntity> Update(ObjectId idDatabase, string connectionString);
	Task Delete(ObjectId idConnection);
}