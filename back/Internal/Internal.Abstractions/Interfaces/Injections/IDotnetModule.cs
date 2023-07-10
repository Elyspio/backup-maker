using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BackupMaker.Api.Abstractions.Interfaces.Injections;


/// <summary>
/// This interface is designed to load records into the .Net Core services.
/// </summary>
public interface IDotnetModule
{
	/// <summary>
	/// This method is expected to be used for the configuration of application services.
	/// </summary>
	/// <param name="services">An instance of IServiceCollection representing the service collections of the application.</param>
	/// <param name="configuration">An instance of IConfiguration representing the application's configuration.</param>
	void Load(IServiceCollection services, IConfiguration configuration);
}


/// <summary>
/// Register an entire module .Net Core services.
/// </summary>
public static class DotnetModuleExtensions
{
	/// <summary>
	/// Register an entire module .Net Core services.
	/// </summary>
	/// <typeparam name="TModule">Module type</typeparam>
	/// <param name="services">Application services</param>
	/// <param name="configuration">Application configuration</param>
	public static void AddModule<TModule>(this IServiceCollection services, IConfiguration configuration) where TModule : IDotnetModule, new()
	{
		var module = Activator.CreateInstance<TModule>();
		module.Load(services, configuration);
	}
}