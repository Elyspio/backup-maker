import React from "react";
import { EntityManager } from "@components/entity/EntityManager";
import { AddMongoTask } from "@components/tasks/mongo/AddMongoTask";
import { EntityList } from "@components/entity/EntityList";

export function Tasks() {
	return <EntityManager name={"Tasks"} title={"Add a new task configuration"} AddComponent={AddMongoTask} elements={<EntityList entity={"backup"} />} />;
}
