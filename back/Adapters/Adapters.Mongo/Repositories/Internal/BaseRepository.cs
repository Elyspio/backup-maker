using BackupMaker.Api.Abstractions.Common.Technical;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Internal;

public abstract class BaseRepository<T> : TracingContext
{
	private readonly string _collectionName;
	private readonly MongoContext _context;
	private readonly ILogger _logger;

	protected BaseRepository(IConfiguration configuration, ILogger logger) : base(logger)
	{
		_context = new(configuration);
		_collectionName = typeof(T).Name[..^"Entity".Length];
		_logger = logger;
		var pack = new ConventionPack
		{
			new EnumRepresentationConvention(BsonType.String)
		};

		ConventionRegistry.Register("EnumStringConvention", pack, t => true);
		BsonSerializer.RegisterSerializationProvider(new EnumAsStringSerializationProvider());
	}

	protected IMongoCollection<T> EntityCollection => _context.MongoDatabase.GetCollection<T>(_collectionName);


	protected void CreateIndexIfMissing(ICollection<string> properties, bool unique = false)
	{
		var indexName = string.Join("-", properties);
		var indexes = EntityCollection.Indexes.List().ToList();
		var foundIndex = indexes.Any(index => index["key"].AsBsonDocument.Names.Contains(indexName));

		var indexBuilder = Builders<T>.IndexKeys;

		var newIndex = indexBuilder.Combine(properties.Select(property => indexBuilder.Ascending(property)));


		var options = new CreateIndexOptions
		{
			Unique = unique,
			Name = indexName
		};

		var indexModel = new CreateIndexModel<T>(newIndex, options);


		if (!foundIndex)
		{
			_logger.LogWarning($"Property {_collectionName}.{indexName} is not indexed, creating one");
			EntityCollection.Indexes.CreateOne(indexModel);
			_logger.LogWarning($"Property {_collectionName}.{indexName} is now indexed");
		}
	}
}

public class EnumAsStringSerializationProvider : BsonSerializationProviderBase
{
	public override IBsonSerializer GetSerializer(Type type, IBsonSerializerRegistry serializerRegistry)
	{
		if (!type.IsEnum) return null;

		var enumSerializerType = typeof(EnumSerializer<>).MakeGenericType(type);
		var enumSerializerConstructor = enumSerializerType.GetConstructor(new[]
		{
			typeof(BsonType)
		});
		var enumSerializer = (IBsonSerializer) enumSerializerConstructor.Invoke(new object[]
		{
			BsonType.String
		});

		return enumSerializer;
	}
}