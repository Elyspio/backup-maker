﻿using BackupMaker.Api.Abstractions.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BackupMaker.Api.Entrypoints.Web.Technical.Filters;

public class HttpExceptionFilter : ExceptionFilterAttribute
{
	public override void OnException(ExceptionContext context)
	{
		if (context.Exception is HttpException ex)
			context.Result = new ObjectResult(ex.ToString())
			{
				StatusCode = (int) ex.Code,
				Value = ex.ToString()
			};
		else
		{
			context.Result = new ObjectResult(context.Exception.ToString())
			{
				StatusCode = 500,
				Value = context.Exception.ToString()
			};
		}

		base.OnException(context);
	}
}