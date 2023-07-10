using MongoDB.Driver;
using MongoDB.Driver.Core.Extensions.DiagnosticSources;

namespace BackupMaker.Api.Adapters.Mongo.Technical;

/// <summary>
/// Manage mongo client
/// </summary>
public class MongoClientFactory
{
	/// <summary>
	/// Create mongo client with telemetry support
	/// </summary>
	/// <param name="connectionString"></param>
	/// <returns></returns>
	public static (MongoClient Client, MongoUrl Url) Create(string connectionString)
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