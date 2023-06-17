import { createSlice } from "@reduxjs/toolkit";

import { TasksState } from "@modules/tasks/tasks.types";
import { manageMongoTasks } from "@modules/tasks/tasks.async.actions";

const initialState: TasksState = {
	mongo: {},
};

const slice = createSlice({
	name: "tasks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(manageMongoTasks.getAll.fulfilled, (state, action) => {
			for (const deploy of action.payload) {
				state.mongo[deploy.id] = deploy;
			}
		});
	},
});

export const tasksReducer = slice.reducer;
