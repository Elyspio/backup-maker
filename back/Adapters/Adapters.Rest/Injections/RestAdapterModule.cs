using BackupMaker.Api.Abstractions.Interfaces.Injections;
using BackupMaker.Api.Adapters.Rest.Configs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BackupMaker.Api.Adapters.Rest.Injections;

public class RestAdapterModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var conf = new EndpointConfig();
		configuration.GetSection(EndpointConfig.Section).Bind(conf);

		// services.AddHttpClient<IUsersClient, UsersClient>(client => { client.BaseAddress = new(conf.Authentication); });
		// services.AddHttpClient<IAuthenticationClient, AuthenticationClient>(client => { client.BaseAddress = new(conf.Authentication); });
	}
}