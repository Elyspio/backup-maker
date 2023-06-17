import { inject, injectable } from "inversify";
import { DeploysLocalClient, MongoDatabaseClient } from "./generated";
import { TokenService } from "@services/common/auth/token.service";
import axios from "axios";

@injectable()
export class BackendApi {
	public database: MongoDatabaseClient;
	public deploys: {
		local: DeploysLocalClient;
	};

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

		this.deploys = {
			local: new DeploysLocalClient(window.config.endpoints.core, instance),
		};
	}
}
