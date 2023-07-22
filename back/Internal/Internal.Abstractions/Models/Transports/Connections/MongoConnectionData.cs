using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo;

namespace BackupMaker.Api.Abstractions.Models.Transports.Connections;

/// <summary>
///     Represents a data model used for MongoDB connection operations.
/// </summary>
public sealed class MongoConnectionData : MongoConnectionBase, ITransport
{
	/// <summary>
	///     Gets or sets the unique identifier (ID) for this MongoDB connection.
	/// </summary>
	public required Guid Id { get; init; }
}