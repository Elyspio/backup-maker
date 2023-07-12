using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using FluentFTP;
using IFtpClient = BackupMaker.Api.Abstractions.Interfaces.Clients.IFtpClient;

namespace BackupMaker.Api.Adapters.Ftp.Clients;

/// <inheritdoc />
public class FtpClient : IFtpClient
{
	/// <inheritdoc />
	public async Task<bool> Upload(string host, string username, string password, int port, FtpEncryption encryptionMode, Stream content, string remotePath)
	{
		using var client = new AsyncFtpClient(host, username, password, port, new()
		{
			EncryptionMode = encryptionMode switch
			{
				FtpEncryption.None => FtpEncryptionMode.None,
				FtpEncryption.Implicit => FtpEncryptionMode.Implicit,
				FtpEncryption.Explicit => FtpEncryptionMode.Explicit,
				_ => FtpEncryptionMode.Auto
			}
		});

		await client.AutoConnect();

		var r = await client.UploadStream(content, remotePath);

		return r != FtpStatus.Failed;
	}
}