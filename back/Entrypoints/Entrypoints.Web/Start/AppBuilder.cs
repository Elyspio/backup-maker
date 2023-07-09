﻿using BackupMaker.Api.Abstractions.Interfaces.Injections;
using BackupMaker.Api.Adapters.Hangfire.Injections;
using BackupMaker.Api.Adapters.Mongo.Injections;
using BackupMaker.Api.Adapters.Rest.Injections;
using BackupMaker.Api.Core.Injections;
using BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

namespace BackupMaker.Api.Entrypoints.Web.Start;

public class AppBuilder
{
	public AppBuilder(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		builder.Configuration.AddJsonFile("appsettings.json", false, true);
		builder.Configuration.AddJsonFile("appsettings.docker.json", true, true);

		builder.Services.AddModule<HangfireAdapterModule>(builder.Configuration);
		builder.Services.AddModule<MongoAdapterModule>(builder.Configuration);
		builder.Services.AddModule<RestAdapterModule>(builder.Configuration);

		builder.Services.AddModule<CoreModule>(builder.Configuration);


		builder.Host.AddLogging();


		builder.Services
			.AddAppControllers()
			.AddAppSignalR()
			.AddAppSwagger()
			.AddAppOpenTelemetry(builder.Configuration);

		if (builder.Environment.IsDevelopment()) builder.Services.SetupDevelopmentCors();

		Application = builder.Build();
	}

	public WebApplication Application { get; }
}