using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities.Deploy;

public class FtpDeployEntity : FtpDeployBase, IEntity
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }
}