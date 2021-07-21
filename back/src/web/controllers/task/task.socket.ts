import {IO, Nsp, Socket, SocketService, SocketSession} from "@tsed/socketio";
import * as SocketIO from "socket.io";
import {Services} from "../../../core/services";

@SocketService("/socket.io/config")
export class MySocketService {

	@Nsp nsp!: SocketIO.Namespace;

	private readonly events = {newConfig: "new-config"};

	constructor(@IO private io: SocketIO.Server) {
		Services.task.on("update", config => {
			this.nsp.emit(this.events.newConfig, config);
		})
	}

	/**
	 * Triggered when a new client connects to the Namespace.
	 */
	$onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
		socket.emit(this.events.newConfig, Services.task.getConfig())
	}

}
