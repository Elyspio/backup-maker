import { JobData, LocalDeployData, MongoBackupTaskData, MongoConnectionData } from "@apis/backend/generated";
import { DeployState } from "@modules/deploys/deploys.types";

export enum AppRoutes {
	mongoConnection = "connections/mongo/:name",
	localDeploy = "deploys/local/:name",
	ftpDeploy = "deploys/ftp/:name",
	mongoTask = "tasks/mongo/:name",
	job = "jobs/:name",
}

export function getConnectionRoute(type: "mongo", con: Pick<MongoConnectionData, "name">) {
	return `/backup/connections/${type}/${con.name}`;
}

export function getDeployRoute(type: keyof DeployState, deploy: Pick<LocalDeployData, "name">) {
	return `/backup/deploys/${type}/${deploy.name}`;
}

export function getTaskRoute(type: "mongo", task: Pick<MongoBackupTaskData, "name">) {
	return `/backup/tasks/${type}/${task.name}`;
}

export function getJobRoute(job: Pick<JobData, "name">) {
	return `/backup/jobs/${job.name}`;
}
