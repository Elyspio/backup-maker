import { FtpDeployData, LocalDeployData } from "@apis/backend/generated";

export type DeployState = {
	local: Record<IdDeployment, LocalDeployData>;
	ftp: Record<IdDeployment, FtpDeployData>;
};

export type IdDeployment = LocalDeployData["id"];
