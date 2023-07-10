namespace BackupMaker.Api.Abstractions.Models.Base.Deploy;

/// <summary>
/// The LocalDeployBase class inherits from the DeployBase class and serves as a data container for local deployment information.
/// </summary>
public class LocalDeployBase : DeployBase
{
	/// <summary>
	///     Gets or sets the output path for the LocalDeployBase object. This property is required.
	/// </summary>
	/// <value>The file system path where deployment files are outputted.</value>
	public required string OutputPath { get; set; }
}