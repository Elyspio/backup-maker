import {CollectionOf, Description, Enum, Example, Min, Property, Required} from "@tsed/schema";
import {AddTaskParam} from "../../../core/services/task/task";
import {ConnectionInfo as IConnectionInfo, ITask, ITaskOnLocal, ITaskOnSsh, ITaskWorkList, TaskState, TaskType, TaskWorkType} from "../../../core/services/task/task.type";

class ConnectionInfo implements IConnectionInfo {
	@Required()
	@Description("Hostname or IP address of the server.")
	host: string;

	@Required()
	@Property(Number)
	@Description("Port number of the server.")
	port: number;

	@Required()
	@Description("Username for authentication.")
	username: string;

	@Description("Password for password-based user authentication.")
	password: string;

	@Description("Private key (base64 encoded).")
	privateKey: string;

}


class Save {
	@Enum("ssh", "local")
	@Required()
	type: "ssh" | "local"

	@Property(ConnectionInfo)
	connectionInfo: ConnectionInfo

	@Property()
	@Required()
	path: string
}


class ScheduleLight {
	@Property()
	@Required()
	@Min(1)
	interval: number
}


class Schedule extends ScheduleLight {
	@Enum(TaskState)
	@Description("State of the task")
	@Example(TaskState.stopped)
	@Required()
	state: TaskState

	@Property()
	lastRun: Date
}


class TaskOn implements ITaskOnLocal, ITaskOnSsh {

	@Property()
	connectionInfo: ConnectionInfo;

	@Property()
	@Required()
	folder: "/";

	@Enum(TaskType)
	@Required()
	type: TaskType.local & TaskType.ssh;

}

class TaskWorkList implements ITaskWorkList {
	@Enum(TaskWorkType)
	@Required()
	type: TaskWorkType.list

	@Property(TaskOn)
	@Required()
	on: TaskOn

	@Property(Save)
	@Required()
	save: ITaskWorkList["save"]
}


export class Task implements ITask {
	@Property()
	@Required()
	id: number;

	@Property(Schedule)
	@Required()
	schedule: Schedule;

	@Property(TaskWorkList)
	@Required()
	work: TaskWorkList;

}

export class ServiceConfig {
	@Required()
	@CollectionOf(Task)
	tasks: Task[]
}


export class AddTask implements AddTaskParam {
	@Property(ScheduleLight)
	@Required()
	schedule: ScheduleLight;

	@Property(TaskWorkList)
	@Required()
	work: TaskWorkList;

}
