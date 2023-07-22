using BackupMaker.Api.Abstractions.Interfaces.Injections;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BackupMaker.Api.Adapters.Ftp.Injections;

/// <summary>
///     Core module responsible for configuring and registering services
/// </summary>
public sealed class FtpModule : IDotnetModule
{
	/// <inheritdoc />
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var nsp = typeof(FtpModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf(".", StringComparison.Ordinal)];
		services.Scan(scan => scan
			.FromAssemblyOf<FtpModule>().AddClasses(classes => classes.InNamespaces(baseNamespace + ".Clients"))
			.AsImplementedInterfaces()
			.WithSingletonLifetime());
	}
}