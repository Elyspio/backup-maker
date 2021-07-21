import io from "socket.io-client";

export const createSocket = () => {
	let {socket: {namespace, hostname}} = window.config.endpoints;
	const path = clearUrl(`${process.env.NODE_ENV === "production" ? "/backup-maker/" : "/"}${namespace}`)
	return io(clearUrl(`${hostname}/${namespace}`), {
		transports: ["websocket"],
		path,
		autoConnect: true
	})
};


function clearUrl(url: string): string {
	return url.replaceAll("//", "/")
}
