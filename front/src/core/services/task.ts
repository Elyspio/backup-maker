import {Apis} from "../apis";
import {AddTask} from "../apis/backend";

export class TaskService {
	getTasks() {
		return Apis.task.taskGetConfig()
	}

	createTask(config: AddTask) {
		return Apis.task.taskCreateTask(config)
	}

	stopTask(id: number) {
		return Apis.task.taskStopTask(id);
	}

	startTask(id: number) {
		return Apis.task.taskRunTask(id);
	}

	async deleteTask(id: number) {
		return Apis.task.taskDeleteTask(id);
	}
}
