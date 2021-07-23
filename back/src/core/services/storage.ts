import {promises} from "fs";
import * as path from "path";
import * as os from "os";
import {Log} from "../utils/decorators/logger";
import {getLogger} from "../utils/logger";
import {Service} from "@tsed/common";

const {writeFile, readFile} = promises

export const files = {
	configFile: process.env.CONFIG_PATH ?? "./config.json"
}

@Service()
export class StorageService {

	private static logger = getLogger.service(StorageService)

	@Log(StorageService.logger, [0])
	async store(name: string, data: string | object) {

		if (name[0] === "~") {
			name = path.join(os.homedir(), name.slice(1))
		}

		if (typeof data === "object") data = JSON.stringify(data, null, 4);

		return writeFile(path.resolve(name), data);
	}

	@Log(StorageService.logger)
	async read(name: string) {
		return (await readFile(name)).toString()
	}
}
