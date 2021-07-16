import {createAction as _createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Services} from "../../../core/services";
import {RootState} from "../../index";
import {AddTask} from "../../../core/apis/backend";
import {ITask} from "../../../../../back/src/core/services/task/task.type";

const createAction = <T>(name: string) => _createAction<T>(`task/${name}`);

export const getConfig = createAsyncThunk("task/getConfig", async () => {
	const {data} = await Services.task.getTasks()
	return data;
})

export const createTask = createAsyncThunk("task/getConfig", async (arg, {dispatch, getState}) => {
	const task = (getState() as RootState).task.creating!;
	await Services.task.createTask(task);
	await Promise.all([
		dispatch(getConfig()),
		dispatch(setTaskCreationState(false))
	])
})

export const stopTask = createAsyncThunk("task/stopTask", async (id: ITask["id"], {dispatch}) => {
	await Services.task.stopTask(id);
	dispatch(getConfig());
})

export const startTask = createAsyncThunk("task/startTask", async (id: ITask["id"], {dispatch}) => {
	await Services.task.startTask(id);
	dispatch(getConfig());
})
export const setTaskCreationState = createAction<boolean>("setTaskCreationState");

export const setTaskCreationSchedule = createAction<AddTask["schedule"]>("setTaskCreationInterval");
export const setTaskCreationWork = createAction<AddTask["work"]>("setTaskCreationWork");
