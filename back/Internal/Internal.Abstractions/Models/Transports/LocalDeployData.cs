using BackupMaker.Api.Abstractions.Models.Base.Deploy;

namespace BackupMaker.Api.Abstractions.Models.Transports;

public class LocalDeployData : LocalDeployBase
{
	public Guid Id { get; set; }
}