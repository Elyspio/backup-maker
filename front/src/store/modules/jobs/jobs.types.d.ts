import { JobData } from "@apis/backend/generated";

export type JobsState = {
	data: Record<IdJob, JobData>;
};

export type IdJob = JobData["id"];
