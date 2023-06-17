import { createSlice } from "@reduxjs/toolkit";
import { MongoDatabaseTypes } from "@modules/databases/mongo/mongo.database.types";
import { getMongoDetails, manageMongoConnections } from "@modules/databases/mongo/mongo.database.async.actions";

const initialState: MongoDatabaseTypes = {
	connections: {},
	details: {},
};

const slice = createSlice({
	name: "databases/mongo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(manageMongoConnections.getAll.fulfilled, (state, action) => {
			for (const con of action.payload) {
				state.connections[con.id] = con;
			}
		});

		builder.addCase(getMongoDetails.fulfilled, (state, action) => {
			for (const id of Object.keys(state.connections)) {
				state.connections[id].error = undefined;
			}

			for (const [id, infos] of Object.entries(action.payload.data)) {
				state.details[id] = {};
				for (const info of infos) {
					state.details[id][info.name] = info;
				}
			}

			for (const [id, error] of Object.entries(action.payload.errors)) {
				state.connections[id].error = error;
			}
		});
	},
});

export const mongoDatabaseReducer = slice.reducer;
