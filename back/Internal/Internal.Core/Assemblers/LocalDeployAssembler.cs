using BackupMaker.Api.Abstractions.Common.Assemblers;
using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Abstractions.Models.Transports;
using Mapster;

namespace BackupMaker.Api.Core.Assemblers;

/// <inheritdoc />
public class LocalDeployAssembler : BaseAssembler<LocalDeployEntity, LocalDeployData>
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