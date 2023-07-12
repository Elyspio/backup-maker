namespace BackupMaker.Api.Abstractions.Models.Base.Deploy;

/// <summary>
///     Serves as a data container for local deployment information.
/// </summary>
public class LocalDeployBase : DeployBase
{
	/// <summary>
	///     The file system path where deployment files are outputted.
	/// </summary>
	public required string OutputPath { get; set; }
}