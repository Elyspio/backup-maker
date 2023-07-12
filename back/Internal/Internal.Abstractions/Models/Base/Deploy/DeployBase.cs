namespace BackupMaker.Api.Abstractions.Models.Base.Deploy;

/// <summary>
///     The DeployBase class serves as a data container for deployment information.
/// </summary>
public class DeployBase
{
	/// <summary>
	///     Gets or sets the name of the DeployBase object.
	/// </summary>
	/// <value>The name that identifies this DeployBase.</value>
	public required string Name { get; set; }
}