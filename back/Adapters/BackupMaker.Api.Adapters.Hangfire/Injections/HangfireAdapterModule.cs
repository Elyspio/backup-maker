using BackupMaker.Api.Abstractions.Interfaces.Injections;
using Hangfire;
using Hangfire.Mongo;
using Hangfire.Mongo.Migration.Strategies;
using Hangfire.Mongo.Migration.Strategies.Backup;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace BackupMaker.Api.Adapters.Hangfire.Injections;

public sealed class HangfireAdapterModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var mongoUrlBuilder = new MongoUrlBuilder(configuration["Database"]);
		var mongoClient = new MongoClient(mongoUrlBuilder.ToMongoUrl());

		// Add Hangfire services. Hangfire.AspNetCore nuget required
		services.AddHangfire(conf => conf
			.SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
			.UseSimpleAssemblyNameTypeSerializer()
			.UseRecommendedSerializerSettings()
			.UseMongoStorage(mongoClient, mongoUrlBuilder.DatabaseName, new MongoStorageOptions
			{
				MigrationOptions = new MongoMigrationOptions
				{
					MigrationStrategy = new MigrateMongoMigrationStrategy(),
					BackupStrategy = new CollectionMongoBackupStrategy()
				},
				Prefix = "hangfire",
				CheckConnection = true,
				InvisibilityTimeout = TimeSpan.FromMinutes(30)
			})
		);

		var nsp = typeof(HangfireAdapterModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf(".", StringComparison.Ordinal)];
		services.Scan(scan => scan
			.FromAssemblyOf<HangfireAdapterModule>().AddClasses(classes => classes.InNamespaces(baseNamespace + ".Triggers"))
			.AsImplementedInterfaces()
			.WithSingletonLifetime());

		// Add the processing server as IHostedService
		services.AddHangfireServer(serverOptions =>
		{
			serverOptions.ServerName = "Hangfire";
			serverOptions.CancellationCheckInterval = TimeSpan.FromSeconds(1);
		});
	}
}