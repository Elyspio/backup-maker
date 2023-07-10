﻿using BackupMaker.Api.Abstractions.Common.Assemblers;
using BackupMaker.Api.Abstractions.Models.Entities;
using BackupMaker.Api.Abstractions.Models.Transports;
using Mapster;

namespace BackupMaker.Api.Core.Assemblers;

/// <inheritdoc />
public class MongoConnectionAssembler : BaseAssembler<MongoConnectionData, MongoConnectionEntity>
{
	/// <inheritdoc />
	public override MongoConnectionEntity Convert(MongoConnectionData obj)
	{
		throw new NotImplementedException();
	}

	/// <inheritdoc />
	public override MongoConnectionData Convert(MongoConnectionEntity obj)
	{
		return obj.Adapt<MongoConnectionData>();
	}
}