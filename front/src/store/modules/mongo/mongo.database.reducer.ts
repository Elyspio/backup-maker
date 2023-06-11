import { createSlice } from "@reduxjs/toolkit";
import { MongoDatabaseTypes } from "@modules/mongo/mongo.database.types";
import { getMongoDetails, manageMongoConnections } from "@modules/mongo/mongo.database.async.actions";

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
			for (const [id, infos] of Object.entries(action.payload)) {
				state.details[id] = {};
				for (const info of infos) {
					state.details[id][info.name] = info;
				}
			}
		});
	},
});

export const mongoDatabaseReducer = slice.reducer;
