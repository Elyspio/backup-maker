using BackupMaker.Api.Entrypoints.Web.Technical.Extensions;
using BackupMaker.Api.Entrypoints.Web.Technical.Filters;
using Hangfire;
using Hangfire.Dashboard;

namespace BackupMaker.Api.Entrypoints.Web.Start;

/// <summary>
///     Application Initializer
/// </summary>
public static class AppRuntime
{
	/// <summary>
	///     Initialize runtime middlewares
	/// </summary>
	/// <param name="app"></param>
	/// <returns></returns>
	public static WebApplication Initialize(this WebApplication app)
	{
		// Allow CORS
		app.UseCors();

		app.UseAppSwagger();

		// Setup authentication
		app.UseAuthentication();
		app.UseAuthorization();

		// Setup Controllers
		app.MapControllers();
		app.UseHangfireDashboard(options: new DashboardOptions
		{
			PrefixPath = app.Environment.IsDevelopment() ? null : "/backup",
			DarkModeEnabled = true,
			Authorization = new IDashboardAuthorizationFilter[]
			{
				new HangfireAuthorizationFilter()
			}
		});


		if (!app.Environment.IsProduction()) return app;

		// Start SPA serving
		app.UseRouting();

		app.UseStaticFiles();

		app.MapWhen(ctx => !ctx.Request.Path.StartsWithSegments("/api"), appBuilder =>
		{
			appBuilder.UseRouting();
			appBuilder.UseEndpoints(ep => { ep.MapFallbackToFile("index.html"); });
		});

		return app;
	}
}