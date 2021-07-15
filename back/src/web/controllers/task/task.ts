import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import {Description, Returns} from "@tsed/schema";
import {Log} from "../../../core/utils/decorators/logger";
import {getLogger} from "../../../core/utils/logger";
import {LocalBackupConfig, ServiceConfig, SshBackupConfig} from "./task.model";
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
		return Services.task.config
	}

	@Post("/config/ssh")
	@Description("Add a ssh config")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async addSshConfig(@BodyParams() config: SshBackupConfig) {
		return Services.task.addSshConfig(config);
	}

	@Post("/config/local")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Description("Add a local config")
	@Log(Task.log)
	async addLocalConfig(@BodyParams() config: LocalBackupConfig) {
		return Services.task.addLocalConfig(config);
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


	@Post("/run")
	@Returns(constants.HTTP_STATUS_NO_CONTENT)
	@Log(Task.log)
	async runAllTask(@PathParams("id") id: number) {
		return Services.task.runAll();
	}
}


