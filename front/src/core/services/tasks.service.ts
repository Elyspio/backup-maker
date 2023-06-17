import { inject, injectable } from "inversify";
import { BackendApi } from "@apis/backend";
import { BaseService } from "./common/technical/base.service";
import { MongoBackupTask, MongoBackupTaskData } from "@apis/backend/generated";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";

@injectable()
export class TasksService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	public readonly mongo = {
		add: (task: MongoBackupTask) => {
			return this.backendApiClient.tasks.createMongoTask(task);
		},
		getAll: () => {
			return this.backendApiClient.tasks.getMongoTasks();
		},
		remove: (idTask: IdConnection) => {
			return this.backendApiClient.tasks.deleteMongoTask(idTask);
		},
		update: (task: MongoBackupTaskData) => {
			return this.backendApiClient.tasks.updateMongoTask(task.id, task);
		},
	};
}
