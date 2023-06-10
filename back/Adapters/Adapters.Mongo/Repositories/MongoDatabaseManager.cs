using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;
using BackupMaker.Api.Adapters.Mongo.Models;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BackupMaker.Api.Adapters.Mongo.Repositories;

internal class MongoDatabaseManager : IMongoDatabaseManager
{
	public MongoDatabaseManager(ILogger<MongoDatabaseManager> logger)
	{
	}

	public async Task<List<DatabaseInfo>> GetDatabases(string connectionString)
	{
		var client = new MongoClient(connectionString);


		var databasesName = await (await client.ListDatabaseNamesAsync()).ToListAsync();

		var databasesResult = await databasesName.Parallelize(async databaseName =>
		{
			var database = client.GetDatabase(databaseName);
			var collections = await (await database.ListCollectionNamesAsync()).ToListAsync();
			var collectionsResult = await collections.Parallelize(async collectionName =>
			{
				var scale = Math.Pow(1024, 2);
				var stats = await database.RunCommandAsync(new BsonDocumentCommand<BsonDocument>(new()
				{
					{
						"collstats", collectionName
					}
				}));


				var indexes = stats["indexSizes"].AsBsonDocument.ToDictionary().ToDictionary(pair => pair.Key, pair => Convert.ToDouble(pair.Value) / scale); 
				
				
				return new CollectionInfo(collectionName, stats["count"].AsInt32, new(stats["totalSize"].ToDouble() / scale, stats["storageSize"].ToDouble() / scale, indexes));
			});

			if (collectionsResult.Status is ParallelStatus.Faulted) throw new AggregateException(collectionsResult.Exceptions.Values);

			
			return new DatabaseInfo(databaseName, collectionsResult.Data);
		});

		if (databasesResult.Status is ParallelStatus.Faulted) throw new AggregateException(databasesResult.Exceptions.Values);


		return databasesResult.Data;
	}
}