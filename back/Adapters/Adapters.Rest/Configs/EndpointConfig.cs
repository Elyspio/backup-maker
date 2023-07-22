namespace BackupMaker.Api.Adapters.Rest.Configs;

/// <summary>
///     Configuration settings related to endpoints used in the application.
/// </summary>
public sealed class EndpointConfig
{
    /// <summary>
    ///     Defines the configuration section name for the endpoints.
    /// </summary>
    public const string Section = "Endpoints";

    /// <summary>
    ///     Gets or sets the authentication setting for the endpoint.
    /// </summary>
    /// <value>
    ///     This property gets/sets the value of the `Authentication` field.
    /// </value>
    public required string Authentication { get; set; }
}