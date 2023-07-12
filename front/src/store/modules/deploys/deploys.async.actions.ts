import { createAsyncActionGenerator, getService } from "@store/utils/utils.actions";
import { FtpDeployBase, FtpDeployData, LocalDeployBase, LocalDeployData } from "@apis/backend/generated";
import { toast } from "react-toastify";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { DeployService } from "@services/deploy.service";

const createAsyncThunkLocal = createAsyncActionGenerator("deploys/local");

export const manageLocalDeploy = {
	add: createAsyncThunkLocal("add", (arg: LocalDeployBase, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return toast.promise(databaseMongoService.local.add(arg), {
			error: `Could not create "${arg.name}" local deploy`,
			success: `The local deploy "${arg.name}" has been created`,
		});
	}),
	delete: createAsyncThunkLocal("delete", (idDeploy: IdConnection, { extra, getState }) => {
		const state = getState();

		const databaseMongoService = getService(DeployService, extra);

		const con = state.deploys.local[idDeploy];

		return toast.promise(databaseMongoService.local.remove(idDeploy), {
			error: `Could not delate "${con.name}" local deploy`,
			success: `The local deploy "${con.name}" has been deleted`,
		});
	}),
	getAll: createAsyncThunkLocal("get-all", (_, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return databaseMongoService.local.getAll();
	}),
	update: createAsyncThunkLocal("update", (deploy: LocalDeployData, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return toast.promise(databaseMongoService.local.update(deploy), {
			error: `Could not update "${deploy.name}" local deploy`,
			success: `The local deploy "${deploy.name}" has been updated`,
		});
	}),
};

const createAsyncThunkFtp = createAsyncActionGenerator("deploys/ftp");

export const manageFtpDeploy = {
	add: createAsyncThunkFtp("add", (arg: FtpDeployBase, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return toast.promise(databaseMongoService.ftp.add(arg), {
			error: `Could not create "${arg.name}" FTP deploy`,
			success: `The FTP deploy "${arg.name}" has been created`,
		});
	}),
	delete: createAsyncThunkFtp("delete", (idDeploy: IdConnection, { extra, getState }) => {
		const state = getState();

		const databaseMongoService = getService(DeployService, extra);

		const con = state.deploys.local[idDeploy];

		return toast.promise(databaseMongoService.ftp.remove(idDeploy), {
			error: `Could not delete "${con.name}" FTP deploy`,
			success: `The FTP deploy "${con.name}" has been deleted`,
		});
	}),
	getAll: createAsyncThunkFtp("get-all", (_, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return databaseMongoService.ftp.getAll();
	}),
	update: createAsyncThunkFtp("update", (deploy: FtpDeployData, { extra }) => {
		const databaseMongoService = getService(DeployService, extra);

		return toast.promise(databaseMongoService.ftp.update(deploy), {
			error: `Could not update "${deploy.name}" local deploy`,
			success: `The FTP deploy "${deploy.name}" has been updated`,
		});
	}),
};
