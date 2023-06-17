import { inject, injectable } from "inversify";
import { BackendApi } from "@apis/backend";
import { BaseService } from "./common/technical/base.service";
import { AddMongoConnectionRequest } from "@apis/backend/generated";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";

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
		remove: (idConnection: IdConnection) => {
			return this.backendApiClient.database.deleteConnection(idConnection);
		},
		updateConnectionString: (idConnection: IdConnection, connectionString: string) => {
			return this.backendApiClient.database.updateConnectionString(idConnection, connectionString);
		},
	};

	public getInformation() {
		return this.backendApiClient.database.getInfos();
	}
}
