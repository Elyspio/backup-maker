import { createAsyncActionGenerator, getService } from "@store/utils/utils.actions";
import { LocalDeployBase, LocalDeployData } from "@apis/backend/generated";
import { toast } from "react-toastify";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { DeployService } from "@services/deploy.service";

const createAsyncThunk = createAsyncActionGenerator("databases/mongo");

export const manageLocalDeploy = {
	add: createAsyncThunk("deploy/mongo/add", (arg: LocalDeployBase, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return toast.promise(databaseMongoService.local.add(arg), {
			error: `Could not create "${arg.name}" connection`,
			success: `The mongo connection "${arg.name}" has been created`,
		});
	}),
	delete: createAsyncThunk("deploy/mongo/delete", (idDeploy: IdConnection, { extra, getState }) => {
		const state = getState();

		const databaseMongoService = getService(DeployService, extra);

		const con = state.deploys.locals[idDeploy];

		return toast.promise(databaseMongoService.local.remove(idDeploy), {
			error: `Could not delate "${con.name}" connection`,
			success: `The mongo connection "${con.name}" has been deleted`,
		});
	}),
	getAll: createAsyncThunk("deploy/mongo/get-all", (_, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return databaseMongoService.local.getAll();
	}),
	update: createAsyncThunk("deploy/mongo/update", (deploy: LocalDeployData, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return toast.promise(databaseMongoService.local.update(deploy), {
			error: `Could not update "${deploy.name}" local deploy`,
			success: `The local deploy "${deploy.name}" has been updated`,
		});
	}),
};
