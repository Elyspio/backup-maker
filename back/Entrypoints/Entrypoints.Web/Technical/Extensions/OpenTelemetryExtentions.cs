using BackupMaker.Api.Abstractions.Common.Technical;
using BackupMaker.Api.Entrypoints.Web.Technical.Helpers;
using OpenTelemetry.Exporter;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

public static class OpenTelemetryExtentions
{
	public static IServiceCollection AddAppOpenTelemetry(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddOptions<OtlpExporterOptions>().Configure(opts => { opts.Endpoint = new(configuration["OpenTelemetry:Url"]!); });

		var sources = AssemblyHelper.GetClassWithInterface<Program, TracingContext>().ToArray();

		services.AddOpenTelemetry()
			.ConfigureResource(conf => conf.AddService(configuration["OpenTelemetry:Service"]!))
			.WithTracing(tracingBuilder =>
			{
				tracingBuilder
					.AddSource(sources)
					// Configure exporters
					.AddOtlpExporter()
					// Configure adapters
					.AddAspNetCoreInstrumentation(options => { options.RecordException = true; })
					.AddHttpClientInstrumentation(options => { options.RecordException = true; })
					.AddMongoDBInstrumentation(); // Adds MongoDB OTel support
			}).WithMetrics(metricBuilder =>
			{
				metricBuilder
					.AddMeter(sources)
					.AddOtlpExporter()
					.AddHttpClientInstrumentation()
					.AddAspNetCoreInstrumentation();
			});

		return services;
	}
}