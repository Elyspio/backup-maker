import {ConnectOptions} from "ssh2-sftp-client";

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
	connectionInfo: ConnectOptions
}

export interface ISaveFilesLocal {
	type: TaskType.local
	path: string
}

export interface ISaveFilesSsh extends Omit<ISaveFilesLocal, "type"> {
	type: TaskType.ssh
	connectionInfo: ConnectOptions

}
