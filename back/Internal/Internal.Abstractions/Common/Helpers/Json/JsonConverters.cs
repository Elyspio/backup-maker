using Newtonsoft.Json.Serialization;

namespace BackupMaker.Api.Abstractions.Common.Helpers.Json;

/// <summary>
///     Contains custom JSON converters for specific serialization and deserialization behaviours.
/// </summary>
public static class JsonConverters
{
	/// <summary>
	///     Mark the property as password and replace content with stars on serialisations
	/// </summary>
	[AttributeUsage(AttributeTargets.Property)]
	public class Password : Attribute;

	/// <inheritdoc />
	internal class JsonReplacePassword(IValueProvider baseValueProvider) : IValueProvider
	{
		/// <inheritdoc />
		public object GetValue(object target)
		{
			// var value = baseValueProvider.GetValue(target);

			// Return the replacement value instead of the original value
			return new string('*', Random.Shared.Next(16, 32));
		}

		/// <inheritdoc />
		public void SetValue(object target, object? value)
		{
			baseValueProvider.SetValue(target, value);
		}
	}
}