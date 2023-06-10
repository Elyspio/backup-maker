namespace BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;

/// <summary>
/// </summary>
/// <param name="Name">Collection's name</param>
/// <param name="Documents">Collection documents count</param>
/// <param name="Sizes">Collection size info</param>
public record CollectionInfo(string Name, long Documents, CollectionSizes Sizes);