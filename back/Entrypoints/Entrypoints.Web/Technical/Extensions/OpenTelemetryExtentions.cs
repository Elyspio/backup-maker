﻿using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Entrypoints.Web.Technical.Helpers;
using OpenTelemetry.Exporter;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

/// <summary>
///     OpenTelemetry Extensions methods for <see cref="IServiceCollection" />
/// </summary>
public static class OpenTelemetryExtentions
{
	/// <summary>
	///     Activate open telemetry support
	/// </summary>
	/// <param name="services"></param>
	/// <param name="configuration"></param>
	/// <returns></returns>
	public static IServiceCollection AddAppOpenTelemetry(this IServiceCollection services, IConfiguration configuration)
	{
		var sources = AssemblyHelper.GetClassWithInterface<Program, ITracingContext>().ToArray();

		services.AddOptions<OtlpExporterOptions>().Configure(opts => { opts.Endpoint = new(configuration["OpenTelemetry:Url"]!); });

		services.AddOpenTelemetryEventLogging();

		services.AddOpenTelemetry()
			.ConfigureResource(conf => conf.AddService(configuration["OpenTelemetry:Service"]!).AddTelemetrySdk())
			.WithTracing(tracingBuilder =>
			{
				tracingBuilder
					.SetErrorStatusOnException()
					.AddSource(sources)
					.AddSource("MongoDB.Driver.Core.Extensions.DiagnosticSources")
					// Configure exporters
					.AddOtlpExporter()
					// Configure adapters
					.AddAspNetCoreInstrumentation(options => { options.RecordException = true; })
					.AddHttpClientInstrumentation(options => { options.RecordException = true; });
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