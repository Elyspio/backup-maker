import { inject, injectable } from "inversify";
import { BackendApi } from "@apis/backend";
import { BaseService } from "./common/technical/base.service";
import { CreateJobRequest, JobData } from "@apis/backend/generated";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";

@injectable()
export class JobsService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	add(deploy: CreateJobRequest) {
		return this.backendApiClient.jobs.createJob(deploy);
	}

	getAll() {
		return this.backendApiClient.jobs.getJobs();
	}

	remove(idJob: IdConnection) {
		return this.backendApiClient.jobs.deleteJob(idJob);
	}

	update(job: JobData) {
		return this.backendApiClient.jobs.updateJob(job.id, job);
	}
}
