namespace BackupMaker.Api.Abstractions.Models.Base;

public abstract class JobBase
{
	/// <summary>
	/// </summary>
	public required string CronInterval { get; set; }
}