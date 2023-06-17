import { createAsyncActionGenerator } from "@store/utils/utils.actions";
import { silentLogin } from "../authentication/authentication.async.action";
import { getMongoDetails, manageMongoConnections } from "@modules/databases/mongo/mongo.database.async.actions";
import { manageLocalDeploy } from "@modules/deploys/local/deploy.async.actions";

const createAsyncThunk = createAsyncActionGenerator("workflow");

export const initApp = createAsyncThunk("init-app", (_, { dispatch }) => {
	dispatch(silentLogin());

	// AuthenticationEvents.on("login", user => {
	dispatch(manageMongoConnections.getAll());
	dispatch(manageLocalDeploy.getAll());
	dispatch(getMongoDetails());
	// })
});
