import {existsSync, readFileSync, writeFileSync} from "fs";
import {files} from "./storage";
import {Services} from "./index";
import {getLogger} from "../utils/logger";
import {Log} from "../utils/decorators/logger";
import {ILocalBackupConfig, ISshBackupConfig} from "./backup";
import {LocalBackupConfig, SshBackupConfig} from "../../web/controllers/task/task.model";


export interface ServiceConfig {
	local: ILocalBackupConfig[],
	ssh: ISshBackupConfig[]
}

export class TaskService {

	private static logger = getLogger.service(TaskService);
	private static lastId = 0;
	public config: ServiceConfig
	private intervals: Record<ISshBackupConfig["id"], NodeJS.Timer> = {};

	public constructor() {
		if (existsSync(files.configFile)) {
			const str = readFileSync(files.configFile).toString();
			this.config = JSON.parse(str);
			[...this.config.ssh, ...this.config.local].forEach(task => task.repeat.state = "paused");
		} else {
			this.config = {
				local: [],
				ssh: []
			}
		}
		this.save(true);
		this.runAll();
	}

	@Log(TaskService.logger)
	public async addSshConfig(conf: Omit<SshBackupConfig, "type" | "id">) {
		this.config.ssh.push({
			save: conf.save,
			work: conf.work,
			folders: conf.folders,
			type: "ssh",
			connectionInfo: conf.connectionInfo,
			id: TaskService.lastId++,
			repeat: {
				interval: conf.repeat.interval,
				state: "paused",
			}
		})
		return this.save()
	}

	@Log(TaskService.logger)
	public async addLocalConfig(conf: Omit<LocalBackupConfig, "type" | "id">) {
		this.config.local.push({
			save: conf.save,
			work: conf.work,
			folders: conf.folders,
			type: "local",
			id: TaskService.lastId++,
			repeat: {
				interval: conf.repeat.interval,
				state: "paused",
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
		const task = [...this.config.ssh, ...this.config.local].find(task => task.id === id);
		// Start task every X milliseconds
		if (this.intervals[task.id] === undefined) {
			this.intervals[task.id] = setInterval(() => {
				return this.run(task.id);
			}, task.repeat.interval)
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
		const tasks = [...this.config.ssh, ...this.config.local].filter(task => task.repeat.state !== "running");
		return await Promise.all(tasks.map(async task => {
			return {id: task.id, data: await this.run(task.id)};
		}))
	}


	/**
	 * Stop a task from restarting
	 * @param id
	 */
	async stop(id: number) {
		const task = [...this.config.ssh, ...this.config.local].find(task => task.id === id);
		if (task) {
			task.repeat.state = "paused"
			if (this.intervals[task.id] !== undefined) {
				clearInterval(this.intervals[task.id])
			}
			await this.save()
		}

	}
}
