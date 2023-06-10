import { createAsyncActionGenerator } from "@store/utils/utils.actions";
import { silentLogin } from "../authentication/authentication.async.action";

const createAsyncThunk = createAsyncActionGenerator("workflow");

export const initApp = createAsyncThunk("init-app", (_, { dispatch }) => {
	dispatch(silentLogin());
});
