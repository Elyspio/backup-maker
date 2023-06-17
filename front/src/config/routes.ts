import { LocalDeployData, MongoConnectionData } from "@apis/backend/generated";

export enum AppRoutes {
	mongoConnection = "connections/mongo/:name",
	localDeploy = "deploys/local/:name",
}

export function getConnectionRoute(type: "mongo", con: Pick<MongoConnectionData, "name">) {
	return `/backup/connections/${type}/${con.name}`;
}

export function getDeployRoute(type: "local", deploy: Pick<LocalDeployData, "name">) {
	return `/backup/deploys/${type}/${deploy.name}`;
}
