using BackupMaker.Api.Abstractions.Common.Helpers.Json;

namespace BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;

/// <summary>
///     FTP server connection details.
/// </summary>
public sealed class FtpConnection
{
	/// <summary>
	///     FTP server host.
	/// </summary>
	public required string Host { get; init; }

	/// <summary>
	///     Username for FTP server.
	/// </summary>
	public required string Username { get; init; }

	/// <summary>
	///     Password for the provided username.
	/// </summary>
	[JsonConverters.Password]
	public required string Password { get; set; }

	/// <summary>
	///     FTP server port.
	/// </summary>
	public required int Port { get; init; }

	/// <summary>
	///     Encryption method for FTP connection.
	/// </summary>
	public required FtpEncryption Encryption { get; init; }
}