using BackupMaker.Api.Abstractions.Models.Base.Database.Mongo.Info;

namespace BackupMaker.Api.Abstractions.Models.Transports.Responses;

/// <summary>
/// Represents the response containing the information about the connections.
/// </summary>
public class GetConnectionInformationResponse
{
	/// <summary>
	/// The key is the connection's unique identifier, and the value is a list of database information.
	/// </summary>
	public required Dictionary<Guid, List<DatabaseInfo>> Data { get; set; }

	/// <summary>
	/// The key is the operation's unique identifier, and the value is the error message.
	/// </summary>

	public required Dictionary<Guid, string> Errors { get; set; }
}