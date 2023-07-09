import React from "react";
import { EntityManager } from "@components/entity/EntityManager";
import { AddJob } from "@components/jobs/AddJob";
import { EntityList } from "@components/entity/EntityList";

export function Jobs() {
	return <EntityManager name={"Jobs"} title={"Add a new job"} AddComponent={AddJob} elements={<EntityList entity={"jobs"} />} />;
}
