using BackupMaker.Api.Abstractions.Interfaces.Repositories.Deploy;
using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using BackupMaker.Api.Abstractions.Models.Entities.Deploy;
using BackupMaker.Api.Adapters.Mongo.Repositories.Base;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Deploy;

internal class FtpDeployRepository(IConfiguration configuration, ILogger<FtpDeployRepository> logger) : CrudRepository<FtpDeployEntity, FtpDeployBase>(configuration, logger), IFtpDeployRepository;