using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;

namespace BackupMaker.Api.Abstractions.Models.Transports.Responses;

/// <summary>
/// </summary>
public class GetConnectionInformationResponse
{
	public required Dictionary<Guid, List<DatabaseInfo>> Data { get; set; }
	public required Dictionary<Guid, string> Errors { get; set; }
}