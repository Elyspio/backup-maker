using Microsoft.Extensions.Logging;
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

	public static string Format(object? value, [CallerArgumentExpression("value")] string name = "")
	{
		return $"{name}={JsonSerializer.Serialize(value, options)}";
	}

	public static string F(object? value, [CallerArgumentExpression("value")] string name = "")
	{
		return Format(value, name);
	}

	public static LoggerInstance<T> Enter<T>(this ILogger<T> logger, string arguments = "", LogLevel level = LogLevel.Debug, [CallerMemberName] string method = "", [CallerFilePath] string fullFilePath = "")
	{
		// On récupère le nom du fichier
		var filePath = fullFilePath[fullFilePath.LastIndexOf(Path.DirectorySeparatorChar)..];

		// On supprime le premier / et l'extension
		var className = filePath[1..^3];

		var loggerInstance = new LoggerInstance<T>(logger, className, method, arguments, level);

		return loggerInstance;
	}


	public class LoggerInstance<T>
	{
		private readonly string _arguments;
		private readonly string _className;
		private readonly LogLevel _level;
		private readonly ILogger<T> _logger;
		private readonly string _method;
		private readonly DateTime _startedAt;

		public LoggerInstance(ILogger<T> logger, string className, string method, string arguments, LogLevel level)
		{
			_arguments = arguments;
			_className = className;
			_level = level;
			_method = method;
			_logger = logger;
			_startedAt = DateTime.Now;

			Enter();
		}

		private void Enter()
		{
			if (!_logger.IsEnabled(_level)) return;

			var sb = new StringBuilder($"Entering method {_className}.{_method}");
			if (_arguments?.Length > 0) sb.Append($": {_arguments}");
			_logger.Log(_level, sb.ToString());
		}

		public static string F(object? value, [CallerArgumentExpression("value")] string name = "")
		{
			return Format(value, name);
		}


		public void Exit(string content = "")
		{
			if (!_logger.IsEnabled(_level)) return;

			var sb = new StringBuilder($"Exiting method {_className}.{_method}");
			if (_arguments?.Length > 0) sb.Append($": {_arguments}");
			if (!string.IsNullOrWhiteSpace(content)) sb.Append($" - {content}");
			sb.Append($" ({(DateTime.Now - _startedAt).Milliseconds}ms)");
			_logger.Log(_level, sb.ToString());
		}
	}
}