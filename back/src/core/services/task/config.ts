import {existsSync, readFileSync} from "fs";
import {files, StorageService} from "../storage";
import {getLogger} from "../../utils/logger";
import {Log} from "../../utils/decorators/logger";
import {ITask, TaskState, TaskType} from "./task.type";
import {Inject, InjectorService, OnInit, Service} from "@tsed/common";
import {TaskNotFoundException} from "./config.exception";
import {TaskSocketService} from "../../../web/controllers/task/task.socket";

const merge = require("lodash/merge");


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
	private _config: ServiceConfig
	private services: {
		storage: StorageService,
		taskSocketService: TaskSocketService
	}

	private get config(): ServiceConfig {
		return {
			...this._config,
			tasks: this._config.tasks.map(task => ({
				...task,
				work: {
					...task.work,
					save: {
						...task.work.save,
						...(task.work.save.type === TaskType.ssh && {
							"connectionInfo": {
								...task.work.save.connectionInfo,
								privateKey: "private"
							}
						})
					},
					on: {
						...task.work.on,
						...(task.work.on.type === TaskType.ssh && {
							"connectionInfo": {
								...task.work.on.connectionInfo,
								...(task.work.on.connectionInfo.privateKey && {privateKey: "private"}),
								...(task.work.on.connectionInfo.password && {password: "private"}),
							}
						}),
					},
				}
			}))

		}
	}

	$onInit(): void | Promise<any> {

		this.services = {
			storage: this.injector.get<StorageService>(StorageService)!,
			taskSocketService: this.injector.get<TaskSocketService>(TaskSocketService)!
		}
		try {
			if (existsSync(files.configFile)) {
				const str = readFileSync(files.configFile).toString();
				this._config = JSON.parse(str);
				this._config.tasks.forEach(task => task.schedule.state = TaskState.stopped);
				ConfigService.lastId = this._config.tasks.reduce((acc, current) => acc < current.id ? current.id : acc, 1) ?? 1
			} else {
				throw "";
			}
		} catch {
			this._config = {
				tasks: []
			}
			ConfigService.lastId = 1;
		}
		return this.save();
	}

	@Log(ConfigService.logger)
	public async getConfig(raw = true) {
		return new Promise<ServiceConfig>(resolve => {
			if (this._config) {
				if(raw) resolve(this._config);
				else resolve(this.config);
			}
			else setTimeout(() => resolve(this.getConfig()), 100);
		})
	}

	@Log(ConfigService.logger)
	public getTask(id: ITask["id"]) {
		return this._config.tasks.find(t => t.id === id);
	}

	/**
	 * @param save if the _config has to be saved on disk
	 * @param task
	 */
	@Log(ConfigService.logger, false)
	public async alterTask(task: Partial<ITask> & { id: ITask["id"] }, save = true) {
		let t = this.getTask(task.id);
		if (!t) throw new TaskNotFoundException(task.id);
		merge(t, task);
		await this.delete(task.id, save);
		this._config.tasks.push(t);
		if (save) await this.save();
		return t;
	}

	@Log(ConfigService.logger)
	public async addTask(conf: AddTaskParam) {
		let id = ++ConfigService.lastId;
		this._config.tasks.push({
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
	 * @param save if the _config has to be saved on disk
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
		this.services.taskSocketService.emitUpdate(this._config);
		return this.services.storage.store(files.configFile, this._config);
	}

	/**
	 * Delete a task
	 * @param id
	 * @param save if the _config has to be saved on disk
	 */
	@Log(ConfigService.logger)
	async delete(id: number, save: boolean = true) {
		this._config.tasks = this._config.tasks.filter(x => x.id !== id);
		if (save) await this.save();
	}
}

