import { JobData, LocalDeployData, MongoBackupTaskData, MongoConnectionData } from "@apis/backend/generated";
import { DeployState } from "@modules/deploys/deploys.types";
import slugify from "slugify";

slugify.extend({
	">": " ",
});

export enum AppRoutes {
	mongoConnection = "connections/mongo/:slug",
	localDeploy = "deploys/local/:slug",
	ftpDeploy = "deploys/ftp/:slug",
	mongoTask = "tasks/mongo/:slug",
	job = "jobs/:slug",
}

export function getConnectionRoute(type: "mongo", con: Pick<MongoConnectionData, "name">) {
	return `/backup/connections/${type}/${slugifyRoute(con.name)}`;
}

export function getDeployRoute(type: keyof DeployState, deploy: Pick<LocalDeployData, "name">) {
	return `/backup/deploys/${type}/${slugifyRoute(deploy.name)}`;
}

export function getTaskRoute(type: "mongo", task: Pick<MongoBackupTaskData, "name">) {
	return `/backup/tasks/${type}/${slugifyRoute(task.name)}`;
}

export function getJobRoute(job: Pick<JobData, "name">) {
	return `/backup/jobs/${slugifyRoute(job.name)}`;
}

export function slugifyRoute(name: string) {
	return slugify(name, {
		lower: true,
		trim: true,
		strict: true,
	});
}
