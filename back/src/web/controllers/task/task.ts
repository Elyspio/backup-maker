import {BodyParams, Controller, Delete, Get, PathParams, Post} from "@tsed/common";
import {Description, Required, Returns} from "@tsed/schema";
import {Log} from "../../../core/utils/decorators/logger";
import {getLogger} from "../../../core/utils/logger";
import {AddTask, ServiceConfig} from "./task.model";
import {Services} from "../../../core/services";
import {constants} from "http2";

@Controller("/task")
export class Task {

	private static log = getLogger.controller(Task);

	@Get("/config")
	@Returns(200, ServiceConfig)
	@Description("Get all configs")
	@Log(Task.log)
	async getConfig() {
		return Services.task.getConfig();
	}


	@Post("/add")
	@Returns(201, Number)
	@Description("Add a local config")
	@Log(Task.log)
	async createTask(@BodyParams() @Required() config: AddTask) {
		return Services.task.addTask(config);
	}


	@Post("/:id/run")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async runTask(@PathParams("id") id: number) {
		return Services.task.run(id);
	}

	@Post("/:id/stop")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async stopTask(@PathParams("id") id: number) {
		return Services.task.stop(id);
	}


	@Delete("/:id")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async deleteTask(@PathParams("id") id: number) {
		return Services.task.delete(id);
	}


	@Post("/run")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async runAllTask(@PathParams("id") id: number) {
		return Services.task.runAll();
	}



}


