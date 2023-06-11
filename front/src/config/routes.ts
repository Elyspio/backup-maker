import { MongoConnectionData } from "@apis/backend/generated";

export enum appRoutes {
	mongoConnection = "connections/mongo/:name",
}

export function getConnectionRoute(type: "mongo", con: Pick<MongoConnectionData, "name">) {
	return `/backup/connections/${type}/${con.name}`;
}
