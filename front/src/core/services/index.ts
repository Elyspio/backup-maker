import {TaskService} from "./task";
import {FileService} from "./files";
import {UtilityService} from "./utils";

export const Services = {
	task: new TaskService(),
	file: new FileService(),
	utility : new UtilityService()
}
