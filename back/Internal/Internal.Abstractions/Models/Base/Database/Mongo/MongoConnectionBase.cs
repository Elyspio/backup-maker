namespace BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

/// <summary>
/// The MongoConnectionBase class is used to establish connections to MongoDB.
/// </summary>
public class MongoConnectionBase
{
	/// <summary>
	/// Gets or sets the name for the MongoConnectionBase object. This property is required.
	/// </summary>
	/// <value>The name of the MongoConnectionBase.</value>
	public required string Name { get; set; }
}