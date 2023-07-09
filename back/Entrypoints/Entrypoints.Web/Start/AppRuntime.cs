using BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

namespace BackupMaker.Api.Entrypoints.Web.Start;

public static class AppRuntime
{
	public static WebApplication Initialize(this WebApplication app)
	{
		// Allow CORS
		app.UseCors();

		app.UseAppSwagger();


		// Start Dependency Injection
		app.UseAdvancedDependencyInjection();

		// Setup authentication
		app.UseAuthentication();
		app.UseAuthorization();

		// Setup Controllers
		app.MapControllers();

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