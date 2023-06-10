import { createSlice } from "@reduxjs/toolkit";
import { MongoDatabaseTypes } from "@modules/mongo/mongo.database.types";

const initialState: MongoDatabaseTypes = {
	todos: {
		public: [],
		user: [],
	},
};

const slice = createSlice({
	name: "databases/mongo",
	initialState,
	reducers: {},
	extraReducers: () => {
		//
	},
});

export const mongoDatabaseReducer = slice.reducer;
