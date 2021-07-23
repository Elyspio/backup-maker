import * as Client from "ssh2-sftp-client"
import {getLogger} from "../utils/logger";
import {Log} from "../utils/decorators/logger";
import {Service} from "@tsed/common";
import {ConnectionInfo} from "./task/task.type";

@Service()
export class SshService {

	private static logger = getLogger.service(SshService);

	@Log(SshService.logger, false)
	async init(info: ConnectionInfo) {
		const client = new Client();
		let privateKey: Buffer | undefined = undefined
		if (info.privateKey) {
			SshService.logger.debug("init -- Using private key for connection")
			privateKey = Buffer.from((info.privateKey as string).slice(37), "base64");
		} else if (info.password) {
			SshService.logger.debug("init -- Using password for connection")
		} else {
			SshService.logger.error("init -- The connection requires the password or the private key to be filled. ")
			throw new Error("The connection requires the password or the private key to be filled.")
		}

		await client.connect({...info, privateKey})
		SshService.logger.debug(`init -- Connected to ${info.host}:${info.port} as ${info.username}`)
		return client;
	}

}
