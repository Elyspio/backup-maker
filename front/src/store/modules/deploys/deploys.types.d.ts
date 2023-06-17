import { LocalDeployData } from "@apis/backend/generated";

export type DeployState = {
	locals: Record<IdDeployment, LocalDeployData>;
};

export type IdDeployment = LocalDeployData["id"];
