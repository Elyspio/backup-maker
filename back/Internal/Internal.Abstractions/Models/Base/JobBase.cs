using System.ComponentModel.DataAnnotations;

namespace BackupMaker.Api.Abstractions.Models.Base;

public abstract class JobBase
{
	public enum Backup
	{
		Mongo
	}


	public enum Deploy
	{
		Local
	}

	public required string Name { get; set; }

	/// <summary>
	/// </summary>
	[RegularExpression(@"/(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/
")]
	public required string CronInterval { get; set; }


	public required Deploy DeployType { get; set; }
	public required Backup BackupType { get; set; }
}