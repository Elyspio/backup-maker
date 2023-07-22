import { createSlice } from "@reduxjs/toolkit";
import { JobsState } from "@modules/jobs/jobs.types";
import { jobsCrud } from "@modules/jobs/jobs.async.actions";

const initialState: JobsState = {
	data: {},
};

const slice = createSlice({
	name: "jobs",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(jobsCrud.getAll.fulfilled, (state, action) => {
			for (const deploy of action.payload) {
				state.data[deploy.id] = deploy;
			}
		});
	},
});

export const jobsReducer = slice.reducer;
