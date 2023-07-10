using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
// ReSharper disable All
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member

namespace BackupMaker.Api.Abstractions.Models.Entities;

public class TaskEntity
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; set; }

	public DateTime CreatedAt { get; set; } = DateTime.Now;
	public List<string> Paths { get; set; } = new();
	public string? Description { get; set; }
	public List<string> Exclusions { get; set; } = new();
	public List<TaskRun> Runs { get; set; } = new();
	public List<TaskRemote> Remotes { get; set; } = new();
}

public class TaskRun
{
	public DateTime Time { get; set; } = DateTime.Now;
	public string? Stdout { get; set; }
	public string? Stderr { get; set; }
}

public class TaskRemote
{
	public enum RemoteType
	{
		Local,
		Ssh
	}

	public RemoteType Kind { get; set; }

	public TaskRemoteLocal Local { get; set; }

	public TaskRemoteSsh Ssh { get; set; }
}

public class TaskRemoteLocal
{
	public string Folder { get; set; }
	public string Filename { get; set; }
}

public class TaskRemoteSsh
{
	public string Hostname { get; set; }
	public string Folder { get; set; }
	public string Filename { get; set; }
	public string Username { get; set; }
	public string Password { get; set; }
}