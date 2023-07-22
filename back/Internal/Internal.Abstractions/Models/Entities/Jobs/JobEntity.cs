using BackupMaker.Api.Abstractions.Interfaces.Business;
using BackupMaker.Api.Abstractions.Models.Base.Job;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackupMaker.Api.Abstractions.Models.Entities.Jobs;

/// <summary>
///     The JobEntity class inherits from JobBase and serves as a data container for job information.
/// </summary>
public sealed class JobEntity : JobBase, IEntity
{
	/// <summary>
	///     Gets or sets the Id of the related JobDeploy object.
	/// </summary>
	/// <value>The ObjectId of the related JobDeploy object.</value>
	public required ObjectId IdDeploy { get; set; }

	/// <summary>
	///     Gets or sets the Id of the related JobBackup object.
	/// </summary>
	/// <value>The ObjectId of the related JobBackup object.</value>
	public required ObjectId IdBackup { get; set; }

	/// <summary>
	///     Gets or sets the unique identifier for the JobEntity object.
	/// </summary>
	/// <value>The ObjectId that uniquely identifies this JobEntity.</value>
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }
}