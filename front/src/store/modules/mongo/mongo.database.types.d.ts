import { DatabaseInfo, MongoConnectionData } from "@apis/backend/generated";

interface MongoConnectionMeta extends MongoConnectionData {
	error?: string;
}

export type MongoDatabaseTypes = {
	connections: Record<IdConnection, MongoConnectionMeta>;
	details: Record<IdConnection, Record<DatabaseInfo["name"], DatabaseInfo>>;
};

export type IdConnection = MongoConnectionData["id"];
