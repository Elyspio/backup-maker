namespace BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;

/// <summary>
///     Types of FTP encryption methods.
/// </summary>
public enum FtpEncryption
{
	/// <summary>
	///     No encryption.
	/// </summary>
	None,

	/// <summary>
	///     Implicit encryption (FTPS).
	/// </summary>
	Implicit,

	/// <summary>
	///     Explicit encryption (FTPES).
	/// </summary>
	Explicit
}