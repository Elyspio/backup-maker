using BackupMaker.Api.Abstractions.Interfaces.Injections;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BackupMaker.Api.Adapters.Compress.Injections;

/// <summary>
///     Core module responsible for configuring and registering services
/// </summary>
public sealed class CompressorModule : IDotnetModule
{
	/// <inheritdoc />
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var nsp = typeof(CompressorModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf(".", StringComparison.Ordinal)];
		services.Scan(scan => scan
			.FromAssemblyOf<CompressorModule>().AddClasses(classes => classes.InNamespaces(baseNamespace + ".Compressors"))
			.AsImplementedInterfaces()
			.WithSingletonLifetime());
	}
}