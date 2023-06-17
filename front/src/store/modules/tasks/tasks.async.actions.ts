import { createAsyncActionGenerator, getService } from "@store/utils/utils.actions";
import { MongoBackupTask, MongoBackupTaskData } from "@apis/backend/generated";
import { toast } from "react-toastify";
import { TasksService } from "@services/tasks.service";
import { IdTask } from "@modules/tasks/tasks.types";

const createAsyncThunk = createAsyncActionGenerator("databases/mongo");

export const manageMongoTasks = {
	add: createAsyncThunk("tasks/mongo/add", (arg: MongoBackupTask, { extra }) => {
		const tasksService = getService(TasksService, extra);

		return toast.promise(tasksService.mongo.add(arg), {
			error: `Could not create "${arg.name}" connection`,
			success: `The mongo connection "${arg.name}" has been created`,
		});
	}),
	delete: createAsyncThunk("tasks/mongo/delete", (idDeploy: IdTask, { extra, getState }) => {
		const state = getState();

		const tasksService = getService(TasksService, extra);

		const task = state.tasks.mongo[idDeploy];

		return toast.promise(tasksService.mongo.remove(idDeploy), {
			error: `Could not delate "${task.name}" connection`,
			success: `The mongo connection "${task.name}" has been deleted`,
		});
	}),
	getAll: createAsyncThunk("tasks/mongo/get-all", (_, { extra }) => {
		const tasksService = getService(TasksService, extra);

		return tasksService.mongo.getAll();
	}),
	update: createAsyncThunk("tasks/mongo/update", (task: MongoBackupTaskData, { extra }) => {
		const tasksService = getService(TasksService, extra);

		return toast.promise(tasksService.mongo.update(task), {
			error: `Could not update "${task.name}" mongo task`,
			success: `The mongo task "${task.name}" has been updated`,
		});
	}),
};
