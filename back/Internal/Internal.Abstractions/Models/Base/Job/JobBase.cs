using System.ComponentModel.DataAnnotations;

namespace BackupMaker.Api.Abstractions.Models.Base.Job;

/// <summary>
///     JobBase is an abstract class that represents a foundational job structure for various types of jobs.
/// </summary>
public abstract class JobBase
{
	/// <summary>
	///     Property Name represents the name of the job.
	/// </summary>
	public required string Name { get; set; }

	/// <summary>
	///     Represents the scheduling interval for the job.
	///     The scheduling interval follows the cron syntax.
	/// </summary>
	/// <remarks>
	///     The regular expressions validates some general cron expressions such as "@annually",
	///     "@monthly", "@weekly", "@daily", "@hourly", "@reboot" and expressions like "@every 1h30m".
	///     It also validates standard cron expressions such as "* * * * *", which represents every minute.
	/// </remarks>
	[RegularExpression("^((\\*(\\/\\d+)?|\\d+(\\-\\d+)?(\\/\\d+)?(,\\d+(\\-\\d+)?(\\/\\d+)?)*)( )?){5}$")]
	public required string CronInterval { get; set; }

	/// <summary>
	///     Represents the deployment type of this job, defined by the Enum JobDeploy.
	/// </summary>
	public required JobDeploy DeployType { get; set; }

	/// <summary>
	///     Represents the backup type of this job, defined by the Enum JobBackup.
	/// </summary>
	public required JobBackup BackupType { get; set; }
}