import { createSlice } from "@reduxjs/toolkit";

import { DeployState } from "@modules/deploys/deploys.types";
import { manageFtpDeploy, manageLocalDeploy } from "@modules/deploys/deploys.async.actions";

const initialState: DeployState = {
	local: {},
	ftp: {},
};

const slice = createSlice({
	name: "deploy",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(manageLocalDeploy.getAll.fulfilled, (state, action) => {
			for (const deploy of action.payload) {
				state.local[deploy.id] = deploy;
			}
		});

		builder.addCase(manageFtpDeploy.getAll.fulfilled, (state, action) => {
			for (const deploy of action.payload) {
				state.ftp[deploy.id] = deploy;
			}
		});
	},
});

export const deploysReducer = slice.reducer;
