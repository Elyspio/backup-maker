using BackupMaker.Api.Abstractions.Common.Assemblers;
using BackupMaker.Api.Abstractions.Models.Entities.Jobs;
using BackupMaker.Api.Abstractions.Models.Transports.Jobs;
using Mapster;

namespace BackupMaker.Api.Core.Assemblers;

/// <inheritdoc />
public class JobAssembler : BaseAssembler<JobData, JobEntity>
{
	/// <inheritdoc />
	public override JobData Convert(JobEntity obj)
	{
		return obj.Adapt<JobData>();
	}


	/// <inheritdoc />
	public override JobEntity Convert(JobData obj)
	{
		return obj.Adapt<JobEntity>();
	}
}