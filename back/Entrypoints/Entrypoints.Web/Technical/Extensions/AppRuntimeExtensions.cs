namespace BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

public static class AppRuntimeExtensions
{
	/// <summary>
	///     Active la gestion de swagger et son interface en gérant le versioning
	/// </summary>
	/// <param name="app"></param>
	/// <returns></returns>
	public static WebApplication UseSwaggerWithVersioning(this WebApplication app)
	{
		app.UseSwagger(options =>
		{
			options.PreSerializeFilters.Add((document, request) =>
			{
				if (!request.Headers.Referer.FirstOrDefault()?.StartsWith("https://") == true) return;

				foreach (var openApiServer in document.Servers) openApiServer.Url = openApiServer.Url.Replace("http://", "https://");
			});
		});
		app.UseSwaggerUI();

		return app;
	}
}