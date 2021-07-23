export interface ConnectionInfo {
	// Hostname or IP address of the server.
	host: string;
	// Port number of the server.
	port: number;
	// Username for authentication.
	username: string;
	// Password for password-based user authentication.
	password: string;
	// Private key (base64 encoded).
	privateKey: string;
}

export enum TaskType {
	local = "local",
	ssh = "ssh"
}

export enum TaskWorkType {
	list = "list"
}

export enum TaskState {
	running = "running",
	stopped = "stopped",
	waiting = "waiting"
}

export interface ITask {
	id: number,
	work: ITaskWorkList,
	schedule: {
		interval: number,
		state: TaskState,
		lastRun?: Date
	}

}

export interface ITaskWorkList {
	type: TaskWorkType.list,
	on: ITaskOnLocal | ITaskOnSsh,
	save: ISaveFilesLocal | ISaveFilesSsh
}

export interface ITaskOnLocal {
	type: TaskType.local,
	folder: "/"
}

export interface ITaskOnSsh extends Omit<ITaskOnLocal, "type"> {
	type: TaskType.ssh,
	connectionInfo: ConnectionInfo
}

export interface ISaveFilesLocal {
	type: TaskType.local
	path: string
}

export interface ISaveFilesSsh extends Omit<ISaveFilesLocal, "type"> {
	type: TaskType.ssh
	connectionInfo: ConnectionInfo

}
