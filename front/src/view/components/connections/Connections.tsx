import React from "react";
import { MongoConnections } from "@components/connections/mongo/MongoConnections";
import { AddMongoConnection } from "@components/connections/mongo/AddMongoConnection";
import { EntityManager } from "@components/entity/EntityManager";

export function Connections() {
	return <EntityManager name={"Connections"} title={"Add a new mongo connection"} AddComponent={AddMongoConnection} DetailComponent={MongoConnections} />;
}
