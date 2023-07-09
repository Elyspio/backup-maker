import React from "react";
import { EntityManager } from "@components/entity/EntityManager";
import { AddLocalDeploy } from "@components/deploys/local/AddLocalDeploy";
import { EntityList } from "@components/entity/EntityList";

export function Deploys() {
	return <EntityManager name={"Deploys"} title={"Add a new deployment connection"} AddComponent={AddLocalDeploy} elements={<EntityList entity={"deploy"} />} />;
}
