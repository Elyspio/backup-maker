import { inject, injectable } from "inversify";
import { BackendApi } from "@apis/backend";
import { BaseService } from "./common/technical/base.service";
import { FtpDeployBase, FtpDeployData, LocalDeployBase, LocalDeployData } from "@apis/backend/generated";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";

@injectable()
export class DeployService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	public readonly local = {
		add: (deploy: LocalDeployBase) => {
			return this.backendApiClient.deploys.local.createLocalDeploy(deploy);
		},
		getAll: () => {
			return this.backendApiClient.deploys.local.getLocalDeployments();
		},
		remove: (idDeploy: IdConnection) => {
			return this.backendApiClient.deploys.local.deleteLocalDeploy(idDeploy);
		},
		update: (deploy: LocalDeployData) => {
			return this.backendApiClient.deploys.local.updateLocalDeploy(deploy.id, deploy);
		},
	};
	public readonly ftp = {
		add: (deploy: FtpDeployBase) => {
			return this.backendApiClient.deploys.ftp.createFtpDeploy(deploy);
		},
		getAll: () => {
			return this.backendApiClient.deploys.ftp.getFtpDeployment();
		},
		remove: (idDeploy: IdConnection) => {
			return this.backendApiClient.deploys.ftp.deleteFtpDeploy(idDeploy);
		},
		update: (deploy: FtpDeployData) => {
			return this.backendApiClient.deploys.ftp.updateFtpDeploy(deploy.id, deploy);
		},
	};
}
