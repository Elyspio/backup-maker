using Adapters.Authentication;
using BackupMaker.Api.Abstractions.Interfaces.Injections;
using BackupMaker.Api.Adapters.Rest.Configs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BackupMaker.Api.Adapters.Rest.Injections;

public class RestAdapterModule : IDotnetModule
{
	/// <inheritdoc />
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var conf = configuration.GetSection(EndpointConfig.Section).Get<EndpointConfig>()!;

		services.AddHttpClient<IJwtClient, JwtClient>(client => { client.BaseAddress = new(conf.Authentication); });
	}
}