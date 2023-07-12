using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;

namespace BackupMaker.Api.Abstractions.Models.Transports.Deploy;

/// <summary>
///     Data model for ftp deployment-related operations.
/// </summary>
public class FtpDeployData : FtpDeployBase, ITransport
{
	/// <summary>
	///     The unique identifier (ID) for the ftp deployment.
	/// </summary>
	public required Guid Id { get; init; }
}