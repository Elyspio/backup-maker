using Newtonsoft.Json;

namespace BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

/// <summary>
///     The MongoConnectionBase class is used to establish connections to MongoDB.
/// </summary>
public class MongoConnectionBase
{
	/// <summary>
	///     Gets or sets the name for the MongoConnectionBase object. This property is required.
	/// </summary>
	/// <value>The name of the MongoConnectionBase.</value>
	public required string Name { get; set; }

	/// <summary>
	///     Gets or sets the Connection String for the MongoDB connection entity.
	/// </summary>
	/// <value>
	///     This property gets/sets the value of the `ConnectionString` field.
	/// </value>
	[JsonIgnore]
	public required string ConnectionString { get; set; }
}