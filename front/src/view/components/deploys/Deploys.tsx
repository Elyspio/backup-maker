import React from "react";
import { EntityManager } from "@components/entity/EntityManager";
import { EntityList } from "@components/entity/EntityList";
import { AddDeploy } from "@components/deploys/AddDeploy";

export function Deploys() {
	return (
		<EntityManager
			name={"Deploys"}
			title={"Add a new deployment connection"}
			AddComponent={AddDeploy}
			elements={
				<>
					<EntityList entity={"deploy/local"} />
					<EntityList entity={"deploy/ftp"} />
				</>
			}
		/>
	);
}
