import { createAsyncActionGenerator, getService } from "@store/utils/utils.actions";
import { CreateJobRequest, JobData } from "@apis/backend/generated";
import { toast } from "react-toastify";
import { JobsService } from "@services/jobs.service";
import { IdJob } from "@modules/jobs/jobs.types";

const createAsyncThunk = createAsyncActionGenerator("jobs");

export const jobsCrud = {
	add: createAsyncThunk("add", (arg: CreateJobRequest, { extra }) => {
		const tasksService = getService(JobsService, extra);

		return toast.promise(tasksService.add(arg), {
			error: `Could not create "${arg.name}" connection`,
			success: `The mongo connection "${arg.name}" has been created`,
		});
	}),
	delete: createAsyncThunk("delete", (idJob: IdJob, { extra, getState }) => {
		const state = getState();

		const tasksService = getService(JobsService, extra);

		const task = state.jobs.data[idJob];

		return toast.promise(tasksService.remove(idJob), {
			error: `Could not delate "${task.name}" connection`,
			success: `The mongo connection "${task.name}" has been deleted`,
		});
	}),
	getAll: createAsyncThunk("get-all", (_, { extra }) => {
		const tasksService = getService(JobsService, extra);

		return tasksService.getAll();
	}),
	update: createAsyncThunk("update", (job: JobData, { extra }) => {
		const jobsService = getService(JobsService, extra);

		return toast.promise(jobsService.update(job), {
			error: `Could not update "${job.name}" job`,
			success: `The job "${job.name}" has been updated`,
		});
	}),
};

export const triggerJob = createAsyncThunk("trigger", (idJob: JobData["id"], { getState, extra }) => {
	const jobsService = getService(JobsService, extra);

	const state = getState();

	const job = state.jobs.data[idJob];

	return toast.promise(jobsService.trigger(idJob), {
		error: `Could not update "${job.name}" job`,
		success: `The job "${job.name}" has been triggered`,
	});
});
