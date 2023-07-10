namespace BackupMaker.Api.Abstractions.Models.Transports.Requests;

/// <summary>
/// Represents a request to add a new MongoDB connection.
/// </summary>
/// <param name="Name">The name for the new MongoDB connection.</param>
/// <param name="ConnectionString">The connection string for the new MongoDB connection.</param>
public record AddMongoConnectionRequest(string Name, string ConnectionString);