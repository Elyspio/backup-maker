using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using FluentFTP;
using Microsoft.Extensions.Logging;
using IFtpClient = BackupMaker.Api.Abstractions.Interfaces.Clients.IFtpClient;

namespace BackupMaker.Api.Adapters.Ftp.Clients;

/// <inheritdoc cref="IFtpClient" />
public sealed class FtpClient(ILogger<FtpClient> logger) : TracingAdapter(logger), IFtpClient
{
	/// <inheritdoc />
	public async Task<bool> Upload(string host, string username, string password, int port, FtpEncryption encryptionMode, Stream content, string remotePath)
	{
		using var _ = LogAdapter($"{Log.F(host)} {Log.F(port)} {Log.F(remotePath)} {Log.F(encryptionMode)} {Log.F(content.Length)}");

		using var client = new AsyncFtpClient(host, username, password, port, new FtpConfig
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

		content.Seek(0, SeekOrigin.Begin);
		var r = await client.UploadStream(content, remotePath, createRemoteDir: true);

		return r != FtpStatus.Failed;
	}
}