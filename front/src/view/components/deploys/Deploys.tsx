import React from "react";
import { EntityManager } from "@components/entity/EntityManager";
import { LocalDeploys } from "@components/deploys/local/LocalDeploys";
import { AddLocalDeploy } from "@components/deploys/local/AddLocalDeploy";

export function Deploys() {
	return <EntityManager name={"Deploys"} title={"Add a new deployment connection"} AddComponent={AddLocalDeploy} DetailComponent={LocalDeploys} />;
}
