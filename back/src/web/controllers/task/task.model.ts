import {Description, Enum, Example, Property, Required} from "@tsed/schema";


class ConnectOptions {
	@Required()
	@Description("Hostname or IP address of the server.")
	@Property(String)
	host: string;

	@Required()
	@Property(Number)
	@Description("Port number of the server.")
	port: number;

	@Required()
	@Description("Username for authentication.")
	@Property(String)
	username: string;

	@Required()
	@Description("Password for password-based user authentication.")
	@Property(String)
	password: string;
}


class Save {
	@Enum("ssh", "local")
	type: "ssh" | "local"

	@Property()
	connectionInfo: ConnectOptions

	@Property()
	@Required()
	path: string
}

class Repeat {
	@Property()
	@Required()
	interval: number

	@Enum("running", "paused", "waiting")
	@Description("State of the task")
	@Example("paused")
	@Required()
	state: "running" | "paused" | "waiting"
}


class BackupConfig {
	@Property()
	id: number

	@Enum("local", "ssh")
	@Required()
	type: "local" | "ssh"

	@Property()
	@Required()
	folders: string[]

	@Enum("list")
	@Required()
	work: "list"

	@Property(Save)
	@Required()
	save: Save

	@Property(Repeat)
	@Required()
	repeat: Repeat
}


export class SshBackupConfig extends BackupConfig {
	@Required()
	@Enum("ssh")
	override type: "ssh"

	@Required()
	@Property(ConnectOptions)
	connectionInfo: ConnectOptions
}


export class LocalBackupConfig extends BackupConfig {
	@Required()
	@Enum("local")
	override type: "local"
}


export class ServiceConfig {
	@Required()
	@Property(LocalBackupConfig)
	local: LocalBackupConfig[]

	@Required()
	@Property(SshBackupConfig)
	ssh: SshBackupConfig[]
}
