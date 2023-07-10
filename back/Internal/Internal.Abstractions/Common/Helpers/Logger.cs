using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BackupMaker.Api.Abstractions.Common.Helpers;

public static class Log
{
	private static readonly JsonSerializerOptions options = new()
	{
		Converters =
		{
			new JsonStringEnumConverter()
		}
	};

	public static string F(object? value, [CallerArgumentExpression("value")] string name = "")
	{
		return $"{name}={JsonSerializer.Serialize(value, options)}";
	}


	public static LoggerInstance Enter(this ILogger logger, string arguments = "", LogLevel level = LogLevel.Debug, Activity? activity = null, [CallerMemberName] string method = "", bool autoExit = true, string className = "")
	{
		return new(logger, method, arguments, level, activity, autoExit, className);
	}

	public static string GetClassNameFromFilepath(string fullFilePath)
	{
		// On récupère le nom du fichier
		var filePath = fullFilePath[fullFilePath.LastIndexOf(Path.DirectorySeparatorChar)..];

		// On supprime le premier / et l'extension
		var className = filePath[1..^3];

		return className;
	}


	public class LoggerInstance : IDisposable
	{
		private readonly Activity? _activity;
		private readonly string _arguments;
		private readonly bool _autoExit;
		private readonly string _className;
		private readonly LogLevel _level;
		private readonly ILogger _logger;
		private readonly string _method;
		private readonly long _startedAt = Stopwatch.GetTimestamp();
		private readonly string? _traceId;

		public LoggerInstance(ILogger logger, string method, string arguments, LogLevel level, Activity? activity = null, bool autoExit = true, string className = "")
		{
			_arguments = arguments;
			_level = level;
			_activity = activity;
			_autoExit = autoExit;
			_method = method;
			_logger = logger;
			_traceId = activity?.RootId ?? activity?.Id;
			_className = className;

			Enter();
		}

		public void Dispose()
		{
			if (_autoExit) Exit();
			_activity?.Dispose();
			GC.SuppressFinalize(this);
		}

		public void Error(string content)
		{
			var sb = new StringBuilder($"{_traceId} {_className}.{_method} -- {content}");
			_logger.LogError(sb.ToString());
		}

		public void Warn(string content)
		{
			var sb = new StringBuilder($"{_traceId} {_className}.{_method} -- {content}");
			_logger.LogWarning(sb.ToString());
		}

		public void Enter()
		{
			if (!_logger.IsEnabled(_level)) return;
			var sb = new StringBuilder($"{_traceId} {_className}.{_method} -- Enter");
			if (_arguments?.Length > 0) sb.Append($" -- {_arguments}");

			_logger.Log(_level, sb.ToString());
		}


		public void Exit(string? content = null)
		{
			if (!_logger.IsEnabled(_level)) return;
			var sb = new StringBuilder($"{_traceId} {_className}.{_method} -- Exit");
			if (_arguments?.Length > 0) sb.Append($" -- {_arguments}");

			if (!string.IsNullOrWhiteSpace(content)) sb.Append($" -- {content}");

			sb.Append($" -- {Stopwatch.GetElapsedTime(_startedAt).Milliseconds}ms");

			_logger.Log(_level, sb.ToString());
		}

		public void Debug(string s)
		{
			if (!_logger.IsEnabled(LogLevel.Debug)) return;
			var sb = new StringBuilder($"{_traceId} {_className}.{_method}");
			if (_arguments?.Length > 0) sb.Append($" -- {_arguments}");
			sb.Append($" -- {s}");

			_logger.LogDebug(sb.ToString());
		}
	}
}