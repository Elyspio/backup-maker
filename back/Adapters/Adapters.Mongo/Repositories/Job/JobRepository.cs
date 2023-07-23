using BackupMaker.Api.Abstractions.Interfaces.Repositories;
using BackupMaker.Api.Abstractions.Models.Entities.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Requests;
using BackupMaker.Api.Adapters.Mongo.Repositories.Base;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Job;

/// Repository implementation for
/// <see cref="JobEntity" />
internal sealed class JobRepository(IConfiguration conf, ILogger<JobRepository> logger) : CrudRepository<JobEntity, CreateJobRequest>(conf, logger), IJobRepository;