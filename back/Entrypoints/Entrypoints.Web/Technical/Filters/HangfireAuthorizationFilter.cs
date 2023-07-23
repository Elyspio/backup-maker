using System.Text.RegularExpressions;
using Hangfire.Dashboard;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Filters;

/// <inheritdoc />
public sealed class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
{
	private static readonly Regex LocalNetworkRegex = new("192.168.0.*", RegexOptions.Compiled | RegexOptions.NonBacktracking);


	/// <inheritdoc />
	public bool Authorize(DashboardContext context)
	{
		try
		{
			var forwaredFor = context.GetHttpContext().Request.Headers["X-Forwarded-For"].ToString();
			return LocalNetworkRegex.IsMatch(forwaredFor);
		}
		catch (Exception)
		{
			return false;
		}
	}
}