namespace BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;

/// <summary>
///     FTP deployment details.
/// </summary>
public class FtpDeployBase : DeployBase
{
	/// <summary>
	///     FTP deployment connection details.
	/// </summary>
	public required FtpConnection Connection { get; init; }

	/// <summary>
	///     The file system path where deployment files are outputted.
	/// </summary>
	public required string OutputPath { get; init; }
}