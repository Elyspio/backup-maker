import { createAsyncActionGenerator, getService } from "@store/utils/utils.actions";
import { AddMongoConnectionRequest } from "@apis/backend/generated";
import { DatabaseMongoService } from "@services/database.service";
import { toast } from "react-toastify";
import { IdConnection } from "@modules/mongo/mongo.database.types";

const createAsyncThunk = createAsyncActionGenerator("databases/mongo");

export const manageMongoConnections = {
	add: createAsyncThunk("connections/add", (arg: AddMongoConnectionRequest, { extra }) => {
		const databaseMongoService = getService(DatabaseMongoService, extra);

		return toast.promise(databaseMongoService.connections.add(arg), {
			error: `Could not create "${arg.name}" connection`,
			success: `The mongo connection "${arg.name}" has been created`,
		});
	}),
	delete: createAsyncThunk("connections/delete", (idConnection: IdConnection, { extra, getState }) => {
		const state = getState();

		const databaseMongoService = getService(DatabaseMongoService, extra);

		const con = state["databases/mongo"].connections[idConnection];

		return toast.promise(databaseMongoService.connections.remove(idConnection), {
			error: `Could not delate "${con.name}" connection`,
			success: `The mongo connection "${con.name}" has been deleted`,
		});
	}),
	getAll: createAsyncThunk("connections/get-all", (_, { extra }) => {
		const databaseMongoService = getService(DatabaseMongoService, extra);

		return databaseMongoService.connections.getAll();
	}),
};

export const getMongoDetails = createAsyncThunk("get-details", (_, { extra }) => {
	const databaseMongoService = getService(DatabaseMongoService, extra);
	return databaseMongoService.getInformation();
});
