using Serilog.Core;
using Serilog.Events;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Filters.Logging;

/// This class is used to filter out the log events for Hangfire Controller actions in your application.
public sealed class DiscardHangfireControllerLogs : ILogEventFilter
{
	/// <inheritdoc />
	public bool IsEnabled(LogEvent logEvent)
	{
		var found = logEvent.Properties.TryGetValue("Path", out var path);
		return !found || !path?.ToString().StartsWith("/hangfire") != true;
	}
}