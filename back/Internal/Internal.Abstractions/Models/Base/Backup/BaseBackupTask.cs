namespace BackupMaker.Api.Abstractions.Models.Base.Backup;

/// <summary>
///     The BaseBackupTask class is an abstract class to be inherited by any backup task.
/// </summary>
public abstract class BaseBackupTask
{
	/// <summary>
	///     Gets or sets a name for the BaseBackupTask object. This property is required.
	/// </summary>
	/// <value>The name of the BaseBackupTask.</value>
	public required string Name { get; set; }
}