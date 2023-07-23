using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using BackupMaker.Api.Abstractions.Models.Transports.Deploy;

namespace BackupMaker.Api.Abstractions.Interfaces.Services.Deploy;

/// <summary>
///     Interface to manage <see cref="FtpDeployData" />
/// </summary>
public interface IFtpDeployService : ICrudService<FtpDeployData, FtpDeployBase>
{
	/// <summary>
	///     Deploy to a FTP server
	/// </summary>
	/// <param name="id">The id of the local deployment to handle.</param>
	/// <param name="archive">The Stream of the archive file to deploy.</param>
	/// <param name="filename">The name of the created file on the server</param>
	/// <param name="cancellationToken"></param>
	/// <returns>A task that represents the asynchronous operation.</returns>
	Task Deploy(Guid id, Stream archive, string filename, CancellationToken cancellationToken);
}