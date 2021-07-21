import {createReducer} from "@reduxjs/toolkit";
import {setConfig, setTaskCreationSchedule, setTaskCreationState, setTaskCreationWork} from "./task.action";
import {AddTask, SaveTypeEnum, ServiceConfig, TaskOnTypeEnum, TaskWorkListTypeEnum} from "../../../core/apis/backend";

export interface TaskState {
	config: ServiceConfig
	creating?: AddTask
}

const defaultState: TaskState = {
	config: {tasks: []},

};

export const taskReducer = createReducer(defaultState, (builder) => {
	builder.addCase(setConfig, (state, action) => {
		state.config = action.payload;
	})


	builder.addCase(setTaskCreationState, (state, action) => {
		if (!action.payload) state.creating = undefined;
		else state.creating = {
			work: {
				type: TaskWorkListTypeEnum.List,
				save: {
					type: SaveTypeEnum.Local,
					path: "/dump.json",
				},
				on: {
					type: TaskOnTypeEnum.Local,
					folder: "/"
				}
			},
			schedule: {
				interval: 1000
			}
		}
	})

	builder.addCase(setTaskCreationSchedule, (state, action) => {
		if (state.creating) {
			state.creating.schedule.interval = action.payload.interval;
		}
	})

	builder.addCase(setTaskCreationWork, (state, action) => {
		if (state.creating) {
			state.creating.work = action.payload;
		}
	})


});

