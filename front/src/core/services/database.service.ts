import { inject, injectable } from "inversify";
import { BackendApi } from "@apis/backend";
import { BaseService } from "./common/technical/base.service";
import { AddMongoConnectionRequest, MongoConnectionData } from "@apis/backend/generated";

@injectable()
export class DatabaseMongoService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	public readonly connections = {
		add: (req: AddMongoConnectionRequest) => {
			return this.backendApiClient.database.addConnection(req);
		},
		getAll: () => {
			return this.backendApiClient.database.getConnections();
		},
		remove: (idConnection: MongoConnectionData["id"]) => {
			return this.backendApiClient.database.deleteConnection(idConnection);
		},
	};

	public getInformation() {
		return this.backendApiClient.database.getInfos();
	}
}
