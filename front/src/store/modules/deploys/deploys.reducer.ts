import { createSlice } from "@reduxjs/toolkit";

import { DeployState } from "@modules/deploys/deploys.types";
import { manageLocalDeploy } from "@modules/deploys/deploys.async.actions";

const initialState: DeployState = {
	locals: {},
};

const slice = createSlice({
	name: "deploy",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(manageLocalDeploy.getAll.fulfilled, (state, action) => {
			for (const deploy of action.payload) {
				state.locals[deploy.id] = deploy;
			}
		});
	},
});

export const deploysReducer = slice.reducer;
