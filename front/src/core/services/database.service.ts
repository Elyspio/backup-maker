import { inject, injectable } from "inversify";
import { BackendApi } from "@apis/backend";
import { BaseService } from "./common/technical/base.service";

@injectable()
export class DatabaseService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;
}
