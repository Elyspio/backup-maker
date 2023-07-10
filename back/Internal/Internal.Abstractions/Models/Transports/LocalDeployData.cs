using BackupMaker.Api.Abstractions.Models.Base.Deploy;

namespace BackupMaker.Api.Abstractions.Models.Transports;

/// <summary>
/// Represents a data model for local deployment-related operations.
/// </summary>
public class LocalDeployData : LocalDeployBase
{
	/// <summary>
	/// Gets or sets the unique identifier (ID) for the local deployment.
	/// </summary>
	public required Guid Id { get; set; }
}