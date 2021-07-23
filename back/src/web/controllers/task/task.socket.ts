import {Inject, InjectorService, OnInit} from "@tsed/common";
import {Namespace, Nsp, OnNamespaceInit, Socket, SocketIOServer, SocketService, SocketSession,} from "@tsed/socketio";
import * as SocketIO from "socket.io";
import {ConfigService, ServiceConfig} from "../../../core/services/task/config";

@SocketService("/socket.io/config")
export class TaskSocketService implements OnInit, OnNamespaceInit {

	private static readonly events = {newConfig: "new-config"};

	@Inject()
	injector: InjectorService;
	@Nsp nsp: Namespace;
	private services: { config: ConfigService };
	@Inject()
	private io: SocketIOServer;

	/**
	 * Triggered the namespace is created
	 */
	$onNamespaceInit(nsp: SocketIO.Namespace) {
		this.nsp = nsp;
	}

	$onInit() {
		this.services = {
			config: this.injector.get<ConfigService>(ConfigService)!
		}
	}

	/**
	 * Triggered when a new client connects to the Namespace.
	 */
	async $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
		socket.emit(TaskSocketService.events.newConfig, await this.services.config.getConfig())
	}

	emitUpdate(conf: ServiceConfig) {
		if (this.nsp === undefined) setTimeout(() => this.emitUpdate(conf), 500)
		else this.nsp.emit(TaskSocketService.events.newConfig, conf);
	}

}

