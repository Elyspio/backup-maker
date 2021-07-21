import {Log} from "../../utils/decorators/logger";
import {Services} from "../index";
import {readdir} from "fs/promises";
import {getLogger} from "../../utils/logger";
import {ISaveFilesLocal, ISaveFilesSsh, ITask, ITaskOnLocal, ITaskOnSsh, TaskState, TaskType, TaskWorkType} from "./task.type";

export class ProcessService {

	private static logger = getLogger.service(ProcessService);

	@Log(ProcessService.logger)
	public async process(conf: ITask) {
		conf.schedule.state = TaskState.running;
		conf.schedule.lastRun = new Date();
		await Services.task.save();

		if (conf.work.type === TaskWorkType.list) await this.processList(conf.work)

		conf.schedule.state = TaskState.waiting;
		await Services.task.save();
	}

	@Log(ProcessService.logger)
	private async processList(work: ITask["work"]) {
		let nodes = Array<string>();
		if (work.on.type == TaskType.local) nodes = await this.processListLocal(work.on)
		if (work.on.type == TaskType.ssh) nodes = await this.processListSsh(work.on)

		if (work.save.type == TaskType.local) await this.saveListLocal(work.save, nodes);
		if (work.save.type == TaskType.ssh) await this.saveListSsh(work.save, nodes);

	}

	@Log(ProcessService.logger)
	private async processListSsh({folder, connectionInfo}: ITaskOnSsh) {
		const client = await Services.ssh.init(connectionInfo);
		ProcessService.logger.info({client})
		return (await client.list(folder)).map(file => file.name);
	}

	@Log(ProcessService.logger)
	private async processListLocal({folder,}: ITaskOnLocal) {
		return readdir(folder)
	}


	// region save files

	@Log(ProcessService.logger)
	private async saveListLocal(info: ISaveFilesLocal, files: string[]) {
		await Services.storage.store(info.path, {files})
	}

	@Log(ProcessService.logger)
	private async saveListSsh(info: ISaveFilesSsh, files: string[]) {
		const client = await Services.ssh.init(info.connectionInfo);
		await client.put(JSON.stringify({files}, null, 4), info.path)
	}

	// endregion
}

