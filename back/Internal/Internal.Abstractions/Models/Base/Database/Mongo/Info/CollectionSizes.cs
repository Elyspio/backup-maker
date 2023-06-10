namespace BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;

/// <summary>
///     Collection size in MegaBytes
/// </summary>
/// <param name="TotalSize">Sum of <see cref="DocumentsSize" /> and <see cref="IndexesSize" /></param>
/// <param name="DocumentsSize"></param>
/// <param name="IndexesSize"></param>
public record CollectionSizes(double TotalSize, double DocumentsSize, Dictionary<string, double> IndexesSize);