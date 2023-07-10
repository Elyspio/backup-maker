using BackupMaker.Api.Abstractions.Common.Helpers;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace BackupMaker.Api.Abstractions.Common.Technical;


public interface ITracingContext
{
	
}

/// <summary>
/// Tracing context for Services and Adapters
/// </summary>
public class TracingContext: ITracingContext
{
	private static readonly ConcurrentDictionary<string, ActivitySource> Sources = new();
	private readonly ILogger _logger;
	private readonly string _sourceName;


	/// <summary>
	/// Default constructor 
	/// </summary>
	/// <param name="logger"></param>
	protected TracingContext(ILogger logger)
	{
		_logger = logger;
		_sourceName = GetType().Name;
		AddSource(_sourceName);
	}

	private ActivitySource ActivitySource => GetActivitySource(_sourceName);

	
	/// <summary>
	/// Create a inner Activity context
	/// </summary>
	/// <param name="label"></param>
	/// <returns></returns>
	protected Activity CreateInnerActivity(string label)
	{
		return ActivitySource.StartActivity(label)!;
	}

	/// <summary>
	/// Get <see cref="ActivitySource"/> from name
	/// </summary>
	/// <param name="name"></param>
	/// <returns></returns>
	public static ActivitySource GetActivitySource(string name)
	{
		return Sources[name];
	}

	/// <summary>
	/// Create a new <see cref="ActivitySource"/>
	/// </summary>
	/// <param name="name"></param>
	public static void AddSource(string name)
	{
		if (!Sources.ContainsKey(name)) Sources.TryAdd(name, new(name));
	}

	/// <summary>
	/// Get a human friendly version of a method name
	/// </summary>
	/// <param name="rawMethodName"></param>
	/// <returns></returns>
	public static string GetMethodName(string rawMethodName)
	{
		if (rawMethodName == ".ctor") rawMethodName = "Constructor";
		return rawMethodName;
	}

	/// <summary>
	/// Create a logger instance for a specific call
	/// </summary>
	/// <param name="arguments"></param>
	/// <param name="method">name of the method (auto)</param>
	/// <param name="fullFilePath">filename of the method (auto)</param>
	/// <param name="autoExit">Pass false to handle <see cref="Log.LoggerInstance.Exit"/> yourself</param>
	/// <returns></returns>
	protected Log.LoggerInstance LogService(string arguments = "", [CallerMemberName] string method = "", [CallerFilePath] string fullFilePath = "", bool autoExit = true)
	{
		method = GetMethodName(method);

		var className = Log.GetClassNameFromFilepath(fullFilePath);
		var activity = ActivitySource.StartActivity($"{className}.{method}");

		return _logger.Enter(arguments, LogLevel.Debug, activity, method, autoExit, className);
	}

	/// <summary>
	/// Create a logger instance for a specific call
	/// </summary>
	/// <param name="arguments"></param>
	/// <param name="method">name of the method (auto)</param>
	/// <param name="fullFilePath">filename of the method (auto)</param>
	/// <param name="autoExit">Pass false to handle <see cref="Log.LoggerInstance.Exit"/> yourself</param>
	/// <returns></returns>
	protected Log.LoggerInstance LogAdapter(string arguments = "", [CallerMemberName] string method = "", [CallerFilePath] string fullFilePath = "", bool autoExit = true)
	{
		method = GetMethodName(method);

		var className = Log.GetClassNameFromFilepath(fullFilePath);
		var activity = ActivitySource.StartActivity($"{className}.{method} : {arguments}");
		return _logger.Enter(arguments, LogLevel.Debug, activity, method, autoExit, className);
	}
}