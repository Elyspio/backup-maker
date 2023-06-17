import { MongoBackupTaskData } from "@apis/backend/generated";

export type TasksState = {
	mongo: Record<IdTask, MongoBackupTaskData>;
};

export type IdTask = MongoBackupTaskData["id"];
