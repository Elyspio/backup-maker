import {AuthenticationService} from "./authentication";
import {Storage} from "./storage";
import {SshService} from "./ssh";
import {TaskService} from "./task/task";
import {BackupService} from "./task/process";

export const Services = {
	authentication: new AuthenticationService(),
	storage: new Storage(),
	ssh: new SshService(),
	task: new TaskService(),
	backup: new BackupService()
}
