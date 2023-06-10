using BackupMaker.Api.Abstractions.Interfaces.Injections;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BackupMaker.Api.Adapters.Mongo.Injections;

public class MongoAdapterModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var nsp = typeof(MongoAdapterModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf(".")];
		services.Scan(scan =>
			scan.FromAssemblyOf<MongoAdapterModule>()
				.AddClasses(classes => classes.InNamespaces($"{baseNamespace}.Repositories", $"{baseNamespace}.Watchers"))
				.AsImplementedInterfaces()
				.WithSingletonLifetime()
		);
	}
}