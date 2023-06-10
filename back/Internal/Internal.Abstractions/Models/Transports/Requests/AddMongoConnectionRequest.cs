namespace BackupMaker.Api.Abstractions.Models.Transports.Requests;

public record AddMongoConnectionRequest(string Name, string ConnectionString);