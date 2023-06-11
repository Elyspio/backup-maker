import { inject, injectable } from "inversify";
import { DatabaseClient } from "./generated";
import { TokenService } from "@services/common/auth/token.service";
import axios from "axios";

@injectable()
export class BackendApi {
	public database: DatabaseClient;

	constructor(@inject(TokenService) tokenService: TokenService) {
		const instance = axios.create({
			withCredentials: true,
			transformResponse: [],
		});

		instance.interceptors.request.use((value) => {
			value.headers!["Authorization"] = `Bearer ${tokenService.getToken()}`;
			return value;
		});

		this.database = new DatabaseClient(window.config.endpoints.core, instance);
	}
}
