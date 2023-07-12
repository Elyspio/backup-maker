using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Entities.Deploy;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories.Deploy;

/// <summary>
///     Manage <see cref="LocalDeployEntity" /> entity in MongoDB
/// </summary>
public interface ILocalDeploymentRepository : ICrudRepository<LocalDeployEntity, LocalDeployBase>;