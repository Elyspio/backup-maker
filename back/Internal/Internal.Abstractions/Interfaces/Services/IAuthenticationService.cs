using System.IdentityModel.Tokens.Jwt;

namespace BackupMaker.Api.Abstractions.Interfaces.Services;

/// <summary>
///     Provides an interface for a service that handles authentication.
/// </summary>
public interface IAuthenticationService
{
	/// <summary>
	///     Validates the provided JSON Web Token (JWT).
	/// </summary>
	/// <param name="token">The JWT to validate.</param>
	/// <param name="validatedToken">The decrypted JWT if the validation was successful.</param>
	/// <returns>Returns true if the token is valid, false otherwise.</returns>
	bool ValidateJwt(string? token, out JwtSecurityToken? validatedToken);
}