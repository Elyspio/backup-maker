using BackupMaker.Api.Abstractions.Common.Assemblers;
using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Abstractions.Models.Transports;
using Mapster;

namespace BackupMaker.Api.Core.Assemblers;

/// <inheritdoc />
public class MongoBackupTaskAssembler : BaseAssembler<MongoBackupTaskEntity, MongoBackupTaskData>
{
	/// <inheritdoc />
	public override MongoBackupTaskData Convert(MongoBackupTaskEntity obj)
	{
		return obj.Adapt<MongoBackupTaskData>();
	}


	/// <inheritdoc />
	public override MongoBackupTaskEntity Convert(MongoBackupTaskData obj)
	{
		return obj.Adapt<MongoBackupTaskEntity>();
	}
}