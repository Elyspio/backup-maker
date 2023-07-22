using BackupMaker.Api.Abstractions.Common.Assemblers;
using BackupMaker.Api.Abstractions.Models.Entities.Deploy;
using BackupMaker.Api.Abstractions.Models.Transports.Deploy;
using Mapster;

namespace BackupMaker.Api.Core.Assemblers;

/// <inheritdoc />
public sealed class FtpDeployAssembler : BaseAssembler<FtpDeployData, FtpDeployEntity>
{
	/// <inheritdoc />
	public override FtpDeployData Convert(FtpDeployEntity obj)
	{
		return obj.Adapt<FtpDeployData>();
	}


	/// <inheritdoc />
	public override FtpDeployEntity Convert(FtpDeployData obj)
	{
		return obj.Adapt<FtpDeployEntity>();
	}
}