using MongoDB.Driver;
using MongoDB.Driver.Core.Extensions.DiagnosticSources;

namespace BackupMaker.Api.Adapters.Mongo.Repositories.Internal;

public class MongoClientFactory
{
	public static (MongoClient Client, MongoUrl mongoUrl) Create(string connectionString)
	{
		var mongoUrl = new MongoUrl(connectionString);
		var clientSettings = MongoClientSettings.FromUrl(mongoUrl);
		clientSettings.ClusterConfigurator = cb => cb.Subscribe(new DiagnosticsActivityEventSubscriber(new()
		{
			CaptureCommandText = true
		}));

		return (new(clientSettings), mongoUrl);
	}
}