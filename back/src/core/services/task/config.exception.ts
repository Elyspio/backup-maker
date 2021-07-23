import {ITask} from "./task.type";

export class TaskNotFoundException extends Error {

	constructor(taskId: ITask["id"]) {
		super(`Could not find a task with id=${taskId}`)
	}
}
