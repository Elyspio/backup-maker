using BackupMaker.Api.Abstractions.Interfaces.Repositories.Deploy;
using BackupMaker.Api.Abstractions.Models.Base.Deploy;
using BackupMaker.Api.Abstractions.Models.Entities.Deploy;
using BackupMaker.Api.Adapters.Mongo.Repositories.Base;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Deploy;

/// <inheritdoc cref="ILocalDeploymentRepository" />
internal class LocalDeployRepository(IConfiguration configuration, ILogger<LocalDeployRepository> logger) : CrudRepository<LocalDeployEntity, LocalDeployBase>(configuration, logger), ILocalDeploymentRepository
{
}