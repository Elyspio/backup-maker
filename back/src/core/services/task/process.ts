import {Log} from "../../utils/decorators/logger";
import {readdir} from "fs/promises";
import {getLogger} from "../../utils/logger";
import {ISaveFilesLocal, ISaveFilesSsh, ITask, ITaskOnLocal, ITaskOnSsh, TaskState, TaskType, TaskWorkType} from "./task.type";
import {Service} from "@tsed/common";
import {StorageService} from "../storage";
import {SshService} from "../ssh";
import {ConfigService} from "./config";
import {TaskNotFoundException} from "./config.exception";

@Service()
export class ProcessService {
	private static logger = getLogger.service(ProcessService);
	private services: { config: ConfigService; ssh: SshService; storage: StorageService };

	constructor(taskService: ConfigService, storageService: StorageService, sshService: SshService) {
		this.services = {
			config: taskService,
			storage: storageService,
			ssh: sshService
		}
	}

	@Log(ProcessService.logger, false)
	public async process(conf: ITask) {

		ProcessService.logger.debug(`Processing task with id=${conf.id}`)

		const task = this.services.config.getTask(conf.id);
		if (!task) {
			throw new TaskNotFoundException(conf.id)
		}
		conf = await this.services.config.alterTask({
			...conf,
			schedule: {
				...conf.schedule,
				state: TaskState.running,
				lastRun: new Date()
			}
		})
		if (conf.work.type === TaskWorkType.list) await this.processList(conf.work)
		await this.services.config.setTaskState(conf.id, TaskState.waiting);
	}

	@Log(ProcessService.logger, false)
	private async processList(work: ITask["work"]) {
		let nodes = Array<string>();
		if (work.on.type == TaskType.local) nodes = await this.processListLocal(work.on)
		if (work.on.type == TaskType.ssh) nodes = await this.processListSsh(work.on)

		if (work.save.type == TaskType.local) await this.saveListLocal(work.save, nodes);
		if (work.save.type == TaskType.ssh) await this.saveListSsh(work.save, nodes);

	}

	// region process

	@Log(ProcessService.logger, false)
	private async processListSsh({folder, connectionInfo}: ITaskOnSsh) {
		const client = await this.services.ssh.init(connectionInfo);
		return (await client.list(folder)).map(file => file.name);
	}

	@Log(ProcessService.logger, false)
	private async processListLocal({folder,}: ITaskOnLocal) {
		return readdir(folder)
	}

	// endregion process

	// region save

	@Log(ProcessService.logger, false)
	private async saveListLocal(info: ISaveFilesLocal, files: string[]) {
		await this.services.storage.store(info.path, {files})
	}

	@Log(ProcessService.logger, false)
	private async saveListSsh(info: ISaveFilesSsh, files: string[]) {
		const client = await this.services.ssh.init(info.connectionInfo);
		await client.put(JSON.stringify({files}, null, 4), info.path)
	}

	// endregion
}

