﻿using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Interfaces.Injections;
using Mapster;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;

namespace BackupMaker.Api.Core.Injections;

public class CoreModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var nsp = typeof(CoreModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf(".")];
		services.Scan(scan => scan
			.FromAssemblyOf<CoreModule>().AddClasses(classes => classes.InNamespaces(baseNamespace + ".Services"))
			.AsImplementedInterfaces()
			.WithSingletonLifetime());

		services.Scan(scan => scan
			.FromAssemblyOf<CoreModule>().AddClasses(classes => classes.InNamespaces(baseNamespace + ".Assemblers"))
			.AsSelf()
			.WithSingletonLifetime());

		TypeAdapterConfig.GlobalSettings.ForType<Guid, ObjectId>().MapWith(id => id.AsObjectId());
		TypeAdapterConfig.GlobalSettings.ForType<ObjectId, Guid>().MapWith(id => id.AsGuid());
		TypeAdapterConfig.GlobalSettings.Default.EnumMappingStrategy(EnumMappingStrategy.ByName);
	}
}