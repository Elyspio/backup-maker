using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

namespace BackupMaker.Api.Abstractions.Models.Transports;

/// <summary>
/// Represents a data model used for MongoDB connection operations.
/// </summary>
public class MongoConnectionData : MongoConnectionBase
{
	/// <summary>
	/// Gets or sets the unique identifier (ID) for this MongoDB connection.
	/// </summary>
	public required Guid Id { get; set; }
}