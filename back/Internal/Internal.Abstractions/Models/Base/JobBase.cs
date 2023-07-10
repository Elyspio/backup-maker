using System.ComponentModel.DataAnnotations;

namespace BackupMaker.Api.Abstractions.Models.Base;

/// <summary>
/// JobBase is an abstract class that represents a foundational job structure for various types of jobs.
/// </summary>
public abstract class JobBase
{
	/// <summary>
	/// Represents the type of backups that this job can handle.
	/// Currently, only MongoDB is supported.
	/// </summary>
	public enum Backup
	{
		/// <summary>
		/// Mongo database source
		/// </summary>
		Mongo
	}

	/// <summary>
	/// Represents the types of deployment this job supports.
	/// Currently, only Local deployment is supported.
	/// </summary>
	public enum Deploy
	{
		/// <summary>
		/// Local deployment
		/// </summary>
		Local
	}

	/// <summary>
	/// Property Name represents the name of the job.
	/// </summary>
	public required string Name { get; set; }

	/// <summary>
	/// Represents the scheduling interval for the job. 
	/// The scheduling interval follows the cron syntax. 
	/// </summary>
	/// <remarks>
	/// The regular expressions validates some general cron expressions such as "@annually",
	/// "@monthly", "@weekly", "@daily", "@hourly", "@reboot" and expressions like "@every 1h30m".
	/// It also validates standard cron expressions such as "* * * * *", which represents every minute.
	/// </remarks>
	[RegularExpression(@"/(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/
")]
	public required string CronInterval { get; set; }

	/// <summary>
	/// Represents the deployment type of this job, defined by the Enum Deploy.
	/// </summary>
	public required Deploy DeployType { get; set; }

	/// <summary>
	/// Represents the backup type of this job, defined by the Enum Backup.
	/// </summary>
	public required Backup BackupType { get; set; }
}