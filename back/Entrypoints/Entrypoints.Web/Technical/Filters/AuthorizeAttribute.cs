using Adapters.Authentication;
using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System.Diagnostics;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Filters;

/// <inheritdoc cref="IAuthorizationFilter" />
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : TypeFilterAttribute
{
	/// <inheritdoc />
	public AuthorizeAttribute(BackupMakerRole role) : base(typeof(CustomAuthorizeFilter))
	{
		Arguments = new object[]
		{
			role
		};
	}
}

public class CustomAuthorizeFilter(BackupMakerRole role, ILogger<CustomAuthorizeFilter> logger) : TracingAttribute, IAuthorizationFilter
{
	public override ILogger Logger { get; set; } = logger;


	/// <inheritdoc />
	public void OnAuthorization(AuthorizationFilterContext context)
	{
		var bearer = context.HttpContext.Request.Headers.Authorization.ToString();


		using var logger = LogAttribute($"path={context.HttpContext.Request.Path} {Log.F(bearer.Length)}");

		var svc = context.HttpContext.RequestServices;
		var tokenService = svc.GetRequiredService<IAuthenticationService>();

		// skip authorization if action is decorated with [AllowAnonymous] attribute
		var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
		if (allowAnonymous)
			return;


		if (!tokenService.ValidateJwt(bearer, out var token))
		{
			context.Result = new JsonResult(new
			{
				status = "Unauthorized"
			})
			{
				StatusCode = StatusCodes.Status401Unauthorized
			};
			logger.Activity?.SetStatus(ActivityStatusCode.Error);
			logger.Activity?.SetCustomProperty("result", context.Result);
			return;
		}


		var userStr = token!.Payload["data"].ToString()!;

		var user = JsonConvert.DeserializeObject<User>(userStr)!;

		context.HttpContext.Items["user"] = user;

		if (user.Authorizations.BackupMaker?.Roles.Contains(role) == true) return;

		context.Result = new JsonResult(new
		{
			status = "Forbidden",
			missingRole = role
		})
		{
			StatusCode = StatusCodes.Status403Forbidden
		};
		logger.Activity?.SetStatus(ActivityStatusCode.Error);
		logger.Activity?.SetCustomProperty("result", context.Result);
	}
}