using Adapters.Authentication;
using BackupMaker.Api.Abstractions.Interfaces.Services;

namespace BackupMaker.Api.Core.Services;

internal class AuthenticationService(IAuthenticationClient authenticationApi, IUsersClient usersApi) : IAuthenticationService
{
	private readonly IAuthenticationClient authenticationApi = authenticationApi;
	private readonly IUsersClient usersApi = usersApi;

	public async Task<bool> IsLogged(string token)
	{
		return await authenticationApi.ValidToken2Async(token);
	}

	public async Task<string> GetUsername(string token)
	{
		return await usersApi.GetUserInfoAsync(Kind.Username, token);
	}
}