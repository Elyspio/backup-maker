using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Exceptions;
using BackupMaker.Api.Abstractions.Interfaces.Clients;
using BackupMaker.Api.Abstractions.Interfaces.Repositories.Deploy;
using BackupMaker.Api.Abstractions.Interfaces.Services.Deploy;
using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using BackupMaker.Api.Abstractions.Models.Entities.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports.Deploy;
using BackupMaker.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Core.Services.Deploy;

/// <inheritdoc cref="IFtpDeployService" />
internal sealed class FtpDeployService(IFtpDeployRepository ftpDeployRepository, ILogger<FtpDeployService> logger, FtpDeployAssembler localDeployAssembler, IFtpClient ftpClient) :
	CrudService<FtpDeployData, FtpDeployBase, FtpDeployEntity>(logger, ftpDeployRepository, localDeployAssembler), IFtpDeployService
{
	/// <inheritdoc />
	public async Task Deploy(Guid id, Stream archive, string filename, CancellationToken cancellationToken)
	{
		using var _ = LogService($"{Log.F(id)} {Log.F(archive.Length)} {Log.F(filename)}");

		var deploy = await ftpDeployRepository.GetById(id.AsObjectId());

		if (deploy is null) throw new HttpException.NotFound<LocalDeployEntity>(id);

		await ftpClient.Upload(deploy.Connection.Host, deploy.Connection.Username, deploy.Connection.Password, deploy.Connection.Port, deploy.Connection.Encryption, archive,
			Path.Join(deploy.OutputPath, filename));
	}

	public new async Task<FtpDeployData> Replace(Guid id, FtpDeployBase @base)
	{
		// Keep the old password if unchanged
		var old = await GetById(id);
		var newPassword = @base.Connection.Password.Replace("*", "").Length > 0;
		if (!newPassword) @base.Connection.Password = old.Connection.Password;

		return await base.Replace(id, @base);
	}
}