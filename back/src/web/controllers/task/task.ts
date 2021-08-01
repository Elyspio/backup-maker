import {BodyParams, Controller, Delete, Get, PathParams, Post} from "@tsed/common";
import {Description, Required, Returns} from "@tsed/schema";
import {Log} from "../../../core/utils/decorators/logger";
import {getLogger} from "../../../core/utils/logger";
import {AddTask, ServiceConfig} from "./task.model";
import {constants} from "http2";
import {TaskService} from "../../../core/services/task/task";
import {ConfigService} from "../../../core/services/task/config";

@Controller("/task")
export class Task {

	private static log = getLogger.controller(Task);
	private services: { task: TaskService, config: ConfigService };


	constructor(taskService: TaskService, configService: ConfigService) {
		this.services = {
			task: taskService,
			config: configService
		}
	}

	@Get("/config")
	@Returns(200, ServiceConfig)
	@Description("Get all configs")
	@Log(Task.log)
	async getConfig() {
		return this.services.config.getConfig(false);
	}


	@Post("/add")
	@Returns(constants.HTTP_STATUS_CREATED, Number)
	@Description("Add a local config")
	@Log(Task.log)
	async createTask(@BodyParams() @Required() config: AddTask) {
		return this.services.task.addTask(config);
	}


	@Post("/:id/run")
	@Returns(201)
	@Log(Task.log)
	async runTask(@PathParams("id") id: number) {
		return this.services.task.run(id);
	}

	@Post("/:id/stop")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async stopTask(@PathParams("id") id: number) {
		return this.services.task.stop(id);
	}


	@Delete("/:id")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async deleteTask(@PathParams("id") id: number) {
		return this.services.task.delete(id);
	}


	@Post("/run")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async runAllTask(@PathParams("id") id: number) {
		return this.services.task.runAll();
	}


}


