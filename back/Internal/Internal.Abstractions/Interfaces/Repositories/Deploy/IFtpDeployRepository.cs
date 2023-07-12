using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using BackupMaker.Api.Abstractions.Models.Entities.Deploy;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories.Deploy;

/// <summary>
///     Manage <see cref="LocalDeployEntity" /> entity in MongoDB
/// </summary>
public interface IFtpDeployRepository : ICrudRepository<FtpDeployEntity, FtpDeployBase>;