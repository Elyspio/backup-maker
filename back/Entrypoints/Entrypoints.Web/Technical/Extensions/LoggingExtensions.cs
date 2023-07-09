using Serilog;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

public static class LoggingExtensions
{
	public static ConfigureHostBuilder AddLogging(this ConfigureHostBuilder host)
	{
		// Setup Logging
		host.UseSerilog((ctx, lc) => lc
			.ReadFrom.Configuration(ctx.Configuration)
			.Enrich.FromLogContext()
			.WriteTo.Console(outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level}] {Message}{NewLine}{Exception}")
		);

		return host;
	}
}