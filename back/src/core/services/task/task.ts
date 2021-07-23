import {StorageService} from "../storage";
import {getLogger} from "../../utils/logger";
import {Log} from "../../utils/decorators/logger";
import {ITask, TaskState} from "./task.type";
import {Service} from "@tsed/common";
import {ProcessService} from "./process";
import {ConfigService} from "./config";


export interface ServiceConfig {
	tasks: ITask[]
}

export type AddTaskParam = Omit<ITask, "schedule" | "id"> & { schedule: Omit<ITask["schedule"], "state" | "lastRun"> }

export declare interface TaskService {
	on(e: "update", callback: (config: ServiceConfig) => void)

	emit(e: "update", config: ServiceConfig)
}

@Service()
export class TaskService {

	private static logger = getLogger.service(TaskService);
	private intervals: Record<ITask["id"], NodeJS.Timer> = {};
	private services: {
		process: ProcessService;
		storage: StorageService
		config: ConfigService
	};

	public constructor(processService: ProcessService, storageService: StorageService, configService: ConfigService) {
		this.services = {
			config: configService,
			process: processService,
			storage: storageService
		}
		this.runAll();
	}


	@Log(TaskService.logger)
	public async addTask(conf: AddTaskParam) {
		return this.services.config.addTask(conf);
	}

	/**
	 * Run specific task
	 * Trigger the running every X seconds
	 * @param id id of a task
	 */
	@Log(TaskService.logger)
	public run(id: number) {
		const task = this.services.config.getTask(id);

		if (!task) {
			throw new Error(`Could not find a task with id=${id}`)
		}

		// Start task every X milliseconds
		if (this.intervals[task.id] === undefined) {
			this.intervals[task.id] = setInterval(() => {
				return this.run(task.id);
			}, task.schedule.interval)
		}
		return this.services.process.process(task);
	}

	/**
	 * Run all tasks that are not running
	 */
	@Log(TaskService.logger)
	public async runAll() {
		const config = await this.services.config.getConfig();
		const tasks = config.tasks.filter(task => task.schedule.state !== TaskState.running);
		return await Promise.all(tasks.map(async task => {
			return {id: task.id, data: await this.run(task.id)};
		}))
	}


	/**
	 * Prevent a task from restarting
	 * @param id
	 */
	@Log(TaskService.logger)
	async stop(id: number) {
		const task = this.services.config.getTask(id);
		if (task) {
			this.services.config.setTaskState(id, TaskState.stopped)
			if (this.intervals[task.id] !== undefined) {
				clearInterval(this.intervals[task.id])
			}
			await this.services.config.save()
		}

	}

	/**
	 * Delete a task
	 * @param id
	 */
	@Log(TaskService.logger)
	async delete(id: number) {
		await this.stop(id);
		await this.services.config.delete(id);
	}
}

