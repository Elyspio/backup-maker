using BackupMaker.Api.Abstractions.Common.Assemblers;
using BackupMaker.Api.Abstractions.Models.Entities.Backup;
using BackupMaker.Api.Abstractions.Models.Transports.Backup;
using Mapster;

namespace BackupMaker.Api.Core.Assemblers;

/// <inheritdoc />
public sealed class MongoBackupTaskAssembler : BaseAssembler<MongoBackupTaskData, MongoBackupTaskEntity>
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