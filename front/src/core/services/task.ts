import {Apis} from "../apis";

export class TaskService {
	getTasks() {
		return Apis.task.taskGetConfig()
	}
}
