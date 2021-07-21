import {createAction as _createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Services} from "../../../core/services";
import store, {RootState} from "../../index";
import {AddTask, ServiceConfig, Task} from "../../../core/apis/backend";
import {createSocket} from "../../../core/services/tasks.socket";

const createAction = <T>(name: string) => _createAction<T>(`task/${name}`);

export const getConfig = createAsyncThunk("task/getConfig", async (arg, {dispatch}) => {
	const {data} = await Services.task.getTasks()
	dispatch(setConfig(data));
})

export const createTask = createAsyncThunk("task/getConfig", async (arg, {dispatch, getState}) => {
	const task = (getState() as RootState).task.creating!;
	await Services.task.createTask(task);
	await Promise.all([
		dispatch(setTaskCreationState(false))
	])
})

export const stopTask = createAsyncThunk("task/stopTask", async (id: Task["id"], {dispatch}) => {
	await Services.task.stopTask(id);
})

export const startTask = createAsyncThunk("task/startTask", async (id: Task["id"], {dispatch}) => {
	await Services.task.startTask(id);
})
export const removeTask = createAsyncThunk("task/startTask", async (id: Task["id"], {dispatch}) => {
	await Services.task.deleteTask(id);
})

export const setTaskCreationState = createAction<boolean>("setTaskCreationState");

export const setTaskCreationSchedule = createAction<AddTask["schedule"]>("setTaskCreationInterval");
export const setTaskCreationWork = createAction<AddTask["work"]>("setTaskCreationWork");
export const setConfig = createAction<ServiceConfig>("setConfig");


const socket = createSocket();
socket.on("new-config", (data) => {
	console.log({data});
	store.dispatch(setConfig(data));
})
