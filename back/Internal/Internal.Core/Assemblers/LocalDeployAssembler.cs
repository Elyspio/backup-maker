using BackupMaker.Api.Abstractions.Common.Assemblers;
using BackupMaker.Api.Abstractions.Models.Entities.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports.Deploy;
using Mapster;

namespace BackupMaker.Api.Core.Assemblers;

/// <inheritdoc />
public sealed class LocalDeployAssembler : BaseAssembler<LocalDeployData, LocalDeployEntity>
{
	/// <inheritdoc />
	public override LocalDeployData Convert(LocalDeployEntity obj)
	{
		return obj.Adapt<LocalDeployData>();
	}


	/// <inheritdoc />
	public override LocalDeployEntity Convert(LocalDeployData obj)
	{
		return obj.Adapt<LocalDeployEntity>();
	}
}