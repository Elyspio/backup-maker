using BackupMaker.Api.Abstractions.Models.Base;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities.Jobs;

/// <summary>
/// The JobEntity class inherits from JobBase and serves as a data container for job information.
/// </summary>
public class JobEntity : JobBase
{
	/// <summary>
	/// Gets or sets the unique identifier for the JobEntity object.
	/// </summary>
	/// <value>The ObjectId that uniquely identifies this JobEntity.</value>
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }

	/// <summary>
	/// Gets or sets the Id of the related Deploy object.
	/// </summary>
	/// <value>The ObjectId of the related Deploy object.</value>
	public required ObjectId IdDeploy { get; set; }

	/// <summary>
	/// Gets or sets the Id of the related Backup object.
	/// </summary>
	/// <value>The ObjectId of the related Backup object.</value>
	public required ObjectId IdBackup { get; set; }
}