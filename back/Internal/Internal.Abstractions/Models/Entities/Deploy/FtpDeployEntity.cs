using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Base.Deploy.Ftp;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities.Deploy;

/// Entity version of <see cref="FtpDeployBase"/>
public sealed class FtpDeployEntity : FtpDeployBase, IEntity
{
	/// <inheritdoc />
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }
}