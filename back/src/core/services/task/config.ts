import {existsSync, readFileSync} from "fs";
import {files, StorageService} from "../storage";
import {getLogger} from "../../utils/logger";
import {Log} from "../../utils/decorators/logger";
import {ITask, TaskState} from "./task.type";
import {Inject, InjectorService, OnInit, Service} from "@tsed/common";
const merge = require("lodash/merge");
import {TaskNotFoundException} from "./config.exception";
import {TaskSocketService} from "../../../web/controllers/task/task.socket";


export interface ServiceConfig {
	tasks: ITask[]
}

export type AddTaskParam = Omit<ITask, "schedule" | "id"> & { schedule: Omit<ITask["schedule"], "state" | "lastRun"> }

@Service()
export class ConfigService implements OnInit {

	private static logger = getLogger.service(ConfigService);
	private static lastId: number;
	@Inject()
	injector: InjectorService;
	private config: ServiceConfig
	private services: {
		storage: StorageService,
		taskSocketService: TaskSocketService
	}

	$onInit(): void | Promise<any> {

		this.services = {
			storage: this.injector.get<StorageService>(StorageService)!,
			taskSocketService: this.injector.get<TaskSocketService>(TaskSocketService)!
		}
		try {
			if (existsSync(files.configFile)) {
				const str = readFileSync(files.configFile).toString();
				this.config = JSON.parse(str);
				this.config.tasks.forEach(task => task.schedule.state = TaskState.stopped);
				ConfigService.lastId = this.config.tasks.reduce((acc, current) => acc < current.id ? current.id : acc, 1) ?? 1
			} else {
				throw "";
			}
		} catch {
			this.config = {
				tasks: []
			}
			ConfigService.lastId = 1;
		}
		return this.save();
	}


	@Log(ConfigService.logger)
	public async getConfig() {
		return new Promise<ServiceConfig>(resolve => {
			if (this.config) resolve(this.config);
			else setTimeout(() => resolve(this.getConfig()), 100);
		})
	}


	@Log(ConfigService.logger)
	public getTask(id: ITask["id"]) {
		return this.config.tasks.find(t => t.id === id);
	}

	/**
	 * @param save if the config has to be saved on disk
	 * @param task
	 */
	@Log(ConfigService.logger, false)
	public async alterTask(task: Partial<ITask> & { id: ITask["id"] }, save = true) {
		let t = this.getTask(task.id);
		if (!t) throw new TaskNotFoundException(task.id);
		merge(t, task);
		await this.delete(task.id, save);
		this.config.tasks.push(t);
		if (save) await this.save();
		return t;
	}

	@Log(ConfigService.logger)
	public async addTask(conf: AddTaskParam) {
		let id = ++ConfigService.lastId;
		this.config.tasks.push({
			work: conf.work,
			id,
			schedule: {
				state: TaskState.stopped,
				interval: conf.schedule.interval,
			}
		})
		await this.save();
		return id;
	}

	/**
	 * Run specific task
	 * Trigger the running every X seconds
	 * @param id id of a task
	 * @param state new state of the task
	 * @param save if the config has to be saved on disk
	 */
	@Log(ConfigService.logger)
	public async setTaskState(id: number, state: ITask["schedule"]["state"], save = true) {
		const task = this.getTask(id);
		if (task) {
			task.schedule.state = state;
			if (save) await this.save();
		} else {
			throw new Error(`Could not find a task with id=${id}`)
		}
	}

	@Log(ConfigService.logger)
	public save(): Promise<void> {
		this.services.taskSocketService.emitUpdate(this.config);
		return this.services.storage.store(files.configFile, this.config);
	}


	/**
	 * Delete a task
	 * @param id
	 * @param save if the config has to be saved on disk
	 */
	@Log(ConfigService.logger)
	async delete(id: number, save: boolean = true) {
		this.config.tasks = this.config.tasks.filter(x => x.id !== id);
		if (save) await this.save();
	}
}

