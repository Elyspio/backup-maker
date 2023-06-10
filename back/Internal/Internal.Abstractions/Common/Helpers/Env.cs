using System.ComponentModel;

namespace BackupMaker.Api.Abstractions.Common.Helpers;

public class Env
{
	public static T Get<T>(string variableName, T fallback)
	{
		var env = Environment.GetEnvironmentVariable(variableName);
		if (env != null)
		{
			var converter = TypeDescriptor.GetConverter(typeof(T));
			return (T) converter.ConvertFromString(env)!;
		}

		return fallback;
	}
}