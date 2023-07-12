using BackupMaker.Api.Abstractions.Common.Helpers.Json;

namespace BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

/// <summary>
///     The MongoConnectionBase class is used to establish connections to MongoDB.
/// </summary>
public class MongoConnectionBase
{
	/// <summary>
	///     The name for the MongoConnectionBase object. This property is required.
	/// </summary>
	/// <value>The name of the MongoConnectionBase.</value>
	public required string Name { get; set; }

	/// <summary>
	///     The Connection String for the MongoDB connection entity.
	/// </summary>
	[JsonConverters.Password]
	public required string ConnectionString { get; set; }
}