import React from "react";
import { AddMongoConnection } from "@components/connections/mongo/AddMongoConnection";
import { EntityManager } from "@components/entity/EntityManager";
import { EntityList } from "@components/entity/EntityList";

export function Connections() {
	return <EntityManager name={"Connections"} title={"Add a new mongo connection"} AddComponent={AddMongoConnection} elements={<EntityList entity={"connection"} />} />;
}
