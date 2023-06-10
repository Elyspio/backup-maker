namespace BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;

/// <summary>
/// </summary>
/// <param name="Name">Database's name</param>
/// <param name="Collections">Database's Collections </param>
public record DatabaseInfo(string Name, List<CollectionInfo> Collections);