import { inject, injectable } from "inversify";
import { DeploysFtpClient, DeploysLocalClient, JobsClient, MongoBackupClient, MongoDatabaseClient } from "./generated";
import { TokenService } from "@services/common/auth/token.service";
import axios from "axios";

@injectable()
export class BackendApi {
	public database: MongoDatabaseClient;
	public deploys: {
		local: DeploysLocalClient;
		ftp: DeploysFtpClient;
	};
	public tasks: MongoBackupClient;
	public jobs: JobsClient;

	constructor(@inject(TokenService) tokenService: TokenService) {
		const instance = axios.create({
			withCredentials: true,
			transformResponse: [],
		});

		instance.interceptors.request.use((value) => {
			value.headers!["Authorization"] = `Bearer ${tokenService.getToken()}`;
			return value;
		});

		this.database = new MongoDatabaseClient(window.config.endpoints.core, instance);
		this.tasks = new MongoBackupClient(window.config.endpoints.core, instance);
		this.jobs = new JobsClient(window.config.endpoints.core, instance);

		this.deploys = {
			local: new DeploysLocalClient(window.config.endpoints.core, instance),
			ftp: new DeploysFtpClient(window.config.endpoints.core, instance),
		};
	}
}
