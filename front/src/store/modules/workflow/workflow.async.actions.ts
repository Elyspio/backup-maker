import { createAsyncActionGenerator } from "@store/utils/utils.actions";
import { silentLogin } from "../authentication/authentication.async.action";
import { getMongoDetails, manageMongoConnections } from "@modules/mongo/mongo.database.async.actions";

const createAsyncThunk = createAsyncActionGenerator("workflow");

export const initApp = createAsyncThunk("init-app", (_, { dispatch }) => {
	dispatch(silentLogin());

	// AuthenticationEvents.on("login", user => {
	dispatch(manageMongoConnections.getAll());
	dispatch(getMongoDetails());
	// })
});
