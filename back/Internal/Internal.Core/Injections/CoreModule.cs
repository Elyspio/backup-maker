using BackupMaker.Api.Abstractions.Common.Extensions;
using BackupMaker.Api.Abstractions.Interfaces.Injections;
using Mapster;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;

namespace BackupMaker.Api.Core.Injections;

/// <summary>
///     Core module responsible for configuring and registering services
/// </summary>
public sealed class CoreModule : IDotnetModule
{
	/// <inheritdoc />
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var nsp = typeof(CoreModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf(".", StringComparison.Ordinal)];
		services.Scan(scan => scan
			.FromAssemblyOf<CoreModule>().AddClasses(classes => classes.InNamespaces(baseNamespace + ".Services"))
			.AsImplementedInterfaces()
			.WithSingletonLifetime());

		services.Scan(scan => scan
			.FromAssemblyOf<CoreModule>().AddClasses(classes => classes.InNamespaces(baseNamespace + ".Assemblers"))
			.AsSelfWithInterfaces()
			.WithSingletonLifetime());

		TypeAdapterConfig.GlobalSettings.ForType<Guid, ObjectId>().MapWith(id => id.AsObjectId());
		TypeAdapterConfig.GlobalSettings.ForType<ObjectId, Guid>().MapWith(id => id.AsGuid());
		TypeAdapterConfig.GlobalSettings.Default.EnumMappingStrategy(EnumMappingStrategy.ByName);
	}
}