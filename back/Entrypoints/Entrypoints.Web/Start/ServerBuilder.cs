using BackupMaker.Api.Abstractions.Interfaces.Injections;
using BackupMaker.Api.Adapters.Hangfire.Injections;
using BackupMaker.Api.Adapters.Mongo.Injections;
using BackupMaker.Api.Adapters.Rest.Injections;
using BackupMaker.Api.Core.Injections;
using BackupMaker.Api.Entrypoints.Web.Technical.Extensions;
using BackupMaker.Api.Entrypoints.Web.Technical.Filters;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Serilog;
using Serilog.Events;
using System.Net;
using System.Text.Json.Serialization;

namespace BackupMaker.Api.Entrypoints.Web.Start;

public class ServerBuilder
{
	public ServerBuilder(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);


		builder.Configuration.AddCommandLine(args).AddJsonFile("appsettings.docker.json", true, true);

		builder.WebHost.ConfigureKestrel((_, options) =>
			{
				options.Listen(IPAddress.Any, 4000, listenOptions =>
					{
						// Use HTTP/3
						listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
					}
				);
			}
		);


		// Setup Logging
		builder.Host.UseSerilog((_, lc) => lc
			.MinimumLevel.Debug()
			.Enrich.FromLogContext()
			.Filter.ByExcluding(@event => @event.Level == LogEventLevel.Debug && @event.Properties["SourceContext"].ToString().Contains("Microsoft.AspNetCore"))
			.WriteTo.Console(outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level}] {SourceContext:l} -- {Message}{NewLine}{Exception}")
		);

		// Setup CORS
		builder.Services.AddCors(options =>
			{
				options.AddPolicy("Cors", b =>
					{
						b.AllowAnyOrigin();
						b.AllowAnyHeader();
						b.AllowAnyMethod();
					}
				);
			}
		);


		builder.Services.AddModule<CoreModule>(builder.Configuration);
		builder.Services.AddModule<MongoAdapterModule>(builder.Configuration);
		builder.Services.AddModule<RestAdapterModule>(builder.Configuration);
		builder.Services.AddModule<HangfireAdapterModule>(builder.Configuration);


		builder.Services.AddControllers(options =>
			{
				//Mise en place de la gestion d'Exception dans tous les controlleurs de l'application
				options.Filters.Add<HttpExceptionFilter>();
			})
			.AddJsonOptions(options =>
			{
				// Convert Enum to String 
				options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
			});


		builder.Services.AddSwagger(builder.Configuration);

		Application = builder.Build();
	}

	public WebApplication Application { get; }
}