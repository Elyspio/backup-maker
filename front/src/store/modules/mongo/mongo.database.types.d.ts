import { DatabaseInfo, MongoConnectionData } from "@apis/backend/generated";

export type MongoDatabaseTypes = {
	connections: Record<IdConnection, MongoConnectionData>;
	details: Record<IdConnection, Record<DatabaseInfo["name"], DatabaseInfo>>;
};

export type IdConnection = MongoConnectionData["id"];
