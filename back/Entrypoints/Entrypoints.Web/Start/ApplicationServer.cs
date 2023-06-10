using BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

namespace BackupMaker.Api.Entrypoints.Web.Start;

public static class ApplicationServer
{
	public static WebApplication Initialize(this WebApplication app)
	{
		app.UseSwaggerWithVersioning();

		if (app.Environment.IsDevelopment()) app.UseDeveloperExceptionPage();

		app.UseHttpsRedirection();
		app.UseRouting();

		if (app.Environment.IsDevelopment()) app.UseCors("Cors");

		app.UseAuthorization();

		app.MapControllers();

		return app;
	}
}