import {existsSync, readFileSync, writeFileSync} from "fs";
import {files} from "../storage";
import {Services} from "../index";
import {getLogger} from "../../utils/logger";
import {Log} from "../../utils/decorators/logger";
import {ITask, TaskState} from "./task.type";


export interface ServiceConfig {
	tasks: ITask[]
}

export type AddTaskParam = Omit<ITask, "schedule" | "id"> & { schedule: Omit<ITask["schedule"], "state" | "lastRun"> }

export class TaskService {

	private static logger = getLogger.service(TaskService);
	private static lastId = 0;
	public config: ServiceConfig
	private intervals: Record<ITask["id"], NodeJS.Timer> = {};

	public constructor() {
		if (existsSync(files.configFile)) {
			const str = readFileSync(files.configFile).toString();
			this.config = JSON.parse(str);
			this.config.tasks.forEach(task => task.schedule.state = TaskState.stopped);
			TaskService.lastId = this.config.tasks.reduce((acc, current) => acc < current.id ? current.id : acc, 0)
		} else {
			this.config = {
				tasks: []
			}
		}
		this.save(true);
		this.runAll();
	}


	@Log(TaskService.logger)
	public async addTask(conf: AddTaskParam) {
		this.config.tasks.push({
			work: conf.work,
			id: TaskService.lastId++,
			schedule: {
				state: TaskState.stopped,
				interval: conf.schedule.interval,
			}
		})
		return this.save()
	}

	/**
	 * Run specific task
	 * Trigger the running every X seconds
	 * @param id id of a task
	 */
	@Log(TaskService.logger)
	public run(id: number) {
		const task = this.config.tasks.find(task => task.id === id);
		// Start task every X milliseconds
		if (this.intervals[task.id] === undefined) {
			this.intervals[task.id] = setInterval(() => {
				return this.run(task.id);
			}, task.schedule.interval)
		}
		return Services.backup.process(task);
	}

	@Log(TaskService.logger)
	public save(sync: boolean = false): void | Promise<void> {
		if (sync) {
			writeFileSync(files.configFile, JSON.stringify(this.config, null, 4));
		} else {
			return Services.storage.store(files.configFile, this.config);
		}
	}

	/**
	 * Run all tasks that are not running
	 */
	@Log(TaskService.logger)
	public async runAll() {
		const tasks = this.config.tasks.filter(task => task.schedule.state !== TaskState.running);
		return await Promise.all(tasks.map(async task => {
			return {id: task.id, data: await this.run(task.id)};
		}))
	}


	/**
	 * Stop a task from restarting
	 * @param id
	 */
	async stop(id: number) {
		const task = this.config.tasks.find(task => task.id === id);
		if (task) {
			task.schedule.state = TaskState.stopped;
			if (this.intervals[task.id] !== undefined) {
				clearInterval(this.intervals[task.id])
			}
			await this.save()
		}

	}
}
