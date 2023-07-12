using BackupMaker.Api.Abstractions.Models.Entities.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;

namespace BackupMaker.Api.Abstractions.Interfaces.Repositories;

/// <summary>
///     Manage <see cref="JobEntity" />
/// </summary>
public interface IJobRepository : ICrudRepository<JobEntity, CreateJobRequest>;