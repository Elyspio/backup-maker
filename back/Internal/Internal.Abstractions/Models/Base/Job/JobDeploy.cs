namespace BackupMaker.Api.Abstractions.Models.Base.Job;

/// <summary>
///     Represents the types of deployment this job supports.
/// </summary>
public enum JobDeploy
{
	/// <summary>
	///     Local deployment
	/// </summary>
	Local,

	/// <summary>
	///     FTP deployment
	/// </summary>
	Ftp
}