using BackupMaker.Api.Abstractions.Configurations;
using BackupMaker.Api.Abstractions.Interfaces.Injections;
using BackupMaker.Api.Adapters.Compress.Injections;
using BackupMaker.Api.Adapters.Ftp.Injections;
using BackupMaker.Api.Adapters.Hangfire.Injections;
using BackupMaker.Api.Adapters.Mongo.Injections;
using BackupMaker.Api.Adapters.Rest.Injections;
using BackupMaker.Api.Core.Injections;
using BackupMaker.Api.Entrypoints.Web.Technical.Extensions;
using Elyspio.OpenTelemetry.Tracing.Builder;

namespace BackupMaker.Api.Entrypoints.Web.Start;

/// <summary>
///     Application builder
/// </summary>
public sealed class AppBuilder
{
	/// <summary>
	///     Create builder from command args
	/// </summary>
	/// <param name="args"></param>
	public AppBuilder(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		builder.Configuration.AddJsonFile("appsettings.docker.json", true, true);

		builder.Services.Configure<CoreConfiguration>(builder.Configuration.GetSection(CoreConfiguration.Section));


		builder.Services.AddModule<HangfireAdapterModule>(builder.Configuration);
		builder.Services.AddModule<MongoAdapterModule>(builder.Configuration);
		builder.Services.AddModule<RestAdapterModule>(builder.Configuration);
		builder.Services.AddModule<FtpModule>(builder.Configuration);
		builder.Services.AddModule<CompressorModule>(builder.Configuration);

		builder.Services.AddModule<CoreModule>(builder.Configuration);

		builder.Host.AddLogging();

		builder.Services
			.AddAppControllers()
			.AddAppSignalR()
			.AddAppSwagger();


		if (builder.Environment.IsDevelopment()) builder.Services.SetupDevelopmentCors();

		var telemetryBuilder = new AppOpenTelemetryBuilder<Program>(builder.Configuration["OpenTelemetry:Service"]!, traceMongo: true)
		{
			// OpenTelemetry agent collector URL
			OtCollectorUri = new Uri(builder.Configuration["OpenTelemetry:Url"]!),
			IgnorePaths = new []
			{
				"/metrics",
				"/swaggger",
				"/favicon.ico"
			},
		};

		telemetryBuilder.Build(builder.Services);
		builder.Services.AddMetrics();

		Application = builder.Build();
	}

	/// <summary>
	///     Built application
	/// </summary>
	public WebApplication Application { get; }
}