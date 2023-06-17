import React from "react";
import { EntityManager } from "@components/entity/EntityManager";
import { MongoTasks } from "@components/tasks/mongo/MongoTasks";
import { AddMongoTask } from "@components/tasks/mongo/AddMongoTask";

export function Tasks() {
	return <EntityManager name={"Tasks"} title={"Add a new task configuration"} AddComponent={AddMongoTask} DetailComponent={MongoTasks} />;
}
