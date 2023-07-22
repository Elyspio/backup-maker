namespace BackupMaker.Api.Abstractions.Configurations;

/// <summary>
///     CoreConfiguration - a configuration class.
/// </summary>
public sealed class CoreConfiguration
{
    /// <summary>
    ///     Section label for configuration.
    /// </summary>
    public const string Section = "Core";

    /// <summary>
    ///     Archive password - required, read-only after initialization.
    /// </summary>
    public required string ArchivePassword { get; init; }
}