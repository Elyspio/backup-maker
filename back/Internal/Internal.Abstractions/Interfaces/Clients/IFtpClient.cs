using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;

namespace BackupMaker.Api.Abstractions.Interfaces.Clients;

/// <summary>
///     Interface defining FTP client operations.
/// </summary>
public interface IFtpClient
{
	/// <summary>
	///     Asynchronously uploads content from a stream to a remote FTP server.
	/// </summary>
	/// <param name="host">The host of the FTP server.</param>
	/// <param name="username">The username to connect to the FTP server.</param>
	/// <param name="password">The password of the username to connect to the FTP server.</param>
	/// <param name="port">The port of the FTP server.</param>
	/// <param name="encryptionMode">The encryption mode for the FTP connection.</param>
	/// <param name="content">The content to be uploaded as a stream.</param>
	/// <param name="remotePath">The path on the remote server where the content will be uploaded.</param>
	/// <returns>
	///     A task representing the asynchronous upload operation. The task result indicates whether the upload operation
	///     was successful.
	/// </returns>
	public Task<bool> Upload(string host, string username, string password, int port, FtpEncryption encryptionMode, Stream content, string remotePath);
}