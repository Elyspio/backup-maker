using MongoDB.Bson;

namespace BackupMaker.Api.Abstractions.Interfaces.Business;

public interface IEntity
{
	public ObjectId Id { get; set; }
}