import * as Client from "ssh2-sftp-client"
import {getLogger} from "../utils/logger";
import {Log} from "../utils/decorators/logger";

export class SshService {

	private static logger = getLogger.service(SshService);

	@Log(SshService.logger)
	async init(info: Client.ConnectOptions) {
		const client = new Client();
		await client.connect(info)
		SshService.logger.debug(`Connected to ${info.host}:${info.port} as ${info.username}`)
		return client;
	}

}
