namespace BackupMaker.Api.Abstractions.Models.Base.Deploy;

public class LocalDeployBase : DeployBase
{
	/// <summary>
	///     Path where files are moved
	/// </summary>
	public required string OutputPath { get; set; }
}