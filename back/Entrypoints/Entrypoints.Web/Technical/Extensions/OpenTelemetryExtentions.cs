using BackupMaker.Api.Abstractions.Common.Technical;
using BackupMaker.Api.Entrypoints.Web.Technical.Helpers;
using OpenTelemetry.Exporter;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using System.Diagnostics;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

public static class OpenTelemetryExtentions
{
	public static IServiceCollection AddAppOpenTelemetry(this IServiceCollection services, IConfiguration configuration)
	{

		var sources = AssemblyHelper.GetClassWithInterface<Program, ITracingContext>().ToArray();


		services.AddOptions<OtlpExporterOptions>().Configure((opts) =>
		{
			opts.Endpoint = new Uri(configuration["OpenTelemetry:Url"]!);
		});
		
		services.AddOpenTelemetryEventLogging();
		
		services.AddOpenTelemetry()
			.ConfigureResource(conf => conf.AddService(configuration["OpenTelemetry:Service"]!).AddTelemetrySdk())
			.WithTracing(tracingBuilder =>
			{
				tracingBuilder
					.SetErrorStatusOnException()
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