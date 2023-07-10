using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace BackupMaker.Api.Entrypoints.Web.Controllers.Base;

public class TracingController : ControllerBase, ITracingContext
{
	private static readonly Dictionary<string, ActivitySource> _sources = new();
	private readonly ILogger _logger;
	private readonly string _sourceName;


	protected TracingController(ILogger logger)
	{
		_logger = logger;
		_sourceName = GetType().Name;
		TracingContext.AddSource(_sourceName);
	}

	private ActivitySource ActivitySource => TracingContext.GetActivitySource(_sourceName);


	protected Log.LoggerInstance LogController(string arguments = "", [CallerMemberName] string method = "", [CallerFilePath] string fullFilePath = "", bool autoExit = true)
	{
		method = TracingContext.GetMethodName(method);

		var className = Log.GetClassNameFromFilepath(fullFilePath);
		var activity = ActivitySource.StartActivity($"{className}.{method}");

		return _logger.Enter(arguments, LogLevel.Information, activity, method, autoExit, className);
	}
}