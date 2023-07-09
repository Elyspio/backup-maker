import { createSlice } from "@reduxjs/toolkit";
import { JobsState } from "@modules/jobs/jobs.types";
import { manageJobs } from "@modules/jobs/jobs.async.actions";

const initialState: JobsState = {
	data: {},
};

const slice = createSlice({
	name: "jobs",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(manageJobs.getAll.fulfilled, (state, action) => {
			for (const deploy of action.payload) {
				state.data[deploy.id] = deploy;
			}
		});
	},
});

export const jobsReducer = slice.reducer;
