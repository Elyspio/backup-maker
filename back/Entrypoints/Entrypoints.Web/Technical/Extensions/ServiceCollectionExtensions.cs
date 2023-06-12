using BackupMaker.Api.Entrypoints.Web.Technical.Filters.Swagger;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Extensions;

public static class ServiceCollectionExtensions
{
	/// <summary>
	///     Active le versionning dans la génération de la documentation Swagger
	/// </summary>
	/// <param name="services"></param>
	/// <returns></returns>
	public static IServiceCollection AddSwagger(this IServiceCollection services, IConfiguration configuration)
	{
		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		services.AddEndpointsApiExplorer();

		// Set the comments path for the Swagger JSON and UI.
		var xmlPaths = Directory.GetFiles(AppContext.BaseDirectory).ToList().Where(f => f.EndsWith(".xml"));


		services.AddSwaggerGen(options =>
		{
			options.SupportNonNullableReferenceTypes();
			options.OperationFilter<SwaggerSetNullableOperationFilter>();
			options.OperationFilter<SwaggerRemoveVersionFilter>();
			options.SchemaFilter<NullableSchemaFilter>();

			options.CustomOperationIds(e => e.ActionDescriptor.RouteValues["action"]);

			foreach (var xmlPath in xmlPaths) options.IncludeXmlComments(xmlPath);
		});

		return services;
	}
}