import {Log} from "../utils/decorators/logger";
import {Services} from "./index";
import {readdir} from "fs/promises";
import {getLogger} from "../utils/logger";
import {ConnectOptions} from "ssh2-sftp-client";

// region types

export interface IBackupConfig {
	id?: number
	type: "local" | "ssh",
	folders: string[],
	work: "list",
	save: SaveLocal | SaveRemote
	repeat: {
		interval: number
		state: "running" | "paused" | "waiting"
	}
}

type SaveLocal = {
	type: "local"
	path: string
}

type SaveRemote = {
	type: "ssh",
	connectionInfo: ConnectOptions,
	path: string

}


export interface ISshBackupConfig extends IBackupConfig {
	type: "ssh",
	connectionInfo: ConnectOptions,
}


export interface ILocalBackupConfig extends IBackupConfig {
	type: "local",
}

// endregion

export class BackupService {

	private static logger = getLogger.service(BackupService);

	@Log(BackupService.logger)
	public async process(conf: IBackupConfig) {
		conf.repeat.state = "running";
		if (conf.type === "ssh") await this.processSsh(conf as ISshBackupConfig);
		if (conf.type === "local") await this.processLocal(conf as ILocalBackupConfig);
		await Services.task.save();
	}

	@Log(BackupService.logger)
	private async processSsh(conf: ISshBackupConfig) {
		if (conf.save.type === "local") {
			if (conf.work === "list") {
				const client = await Services.ssh.init(conf.connectionInfo);
				const nodes = await Promise.all(conf.folders.map(folder => client.list(folder)))
				const files = nodes.flat().map(file => file.name);
				await this.saveFilesSsh(conf, files)
			}
		}
	}

	@Log(BackupService.logger)
	private async processLocal(conf: ILocalBackupConfig) {
		if (conf.save.type === "local") {
			if (conf.work === "list") {
				const nodes = await Promise.all(conf.folders.map(folder => readdir(folder)))
				const files = nodes.flat();
				await this.saveFilesLocal(conf, files)
			}
		}
	}


	// region save files

	private async saveFilesLocal(conf: ILocalBackupConfig, files: string[]) {
		if (conf.save.type !== "local") throw new Error("Wrong method used, see BackupService.saveFilesSsh()")
		await Services.storage.store(conf.save.path, {files})
	}

	private async saveFilesSsh(conf: ISshBackupConfig, files: string[]) {
		if (conf.save.type !== "ssh") throw new Error("Wrong method used, see BackupService.saveFilesLocal()")
		await Services.storage.store(conf.save.path, {files})
	}

	// endregion
}
