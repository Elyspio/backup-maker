import {Logger} from "@tsed/logger";
import {Helper} from "../helper";


declare global {
	interface Function {
		logger: Logger
	}
}


export const Log = (logger: Logger, logOnly: number[] = []) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	let originalMethod = descriptor.value


	const argsName = Helper.getFunctionArgs(originalMethod);

	descriptor.value = function (...args: any[]) {
		const argsStr = argsName.reduce((previousValue, currentValue, currentIndex) => {
			if(logOnly.length > 0 ) {
				if(!logOnly.includes(currentIndex)) return previousValue;
			}
			return `${previousValue} ${currentValue}=${JSON.stringify(args[currentIndex])}`
		}, "");
		logger.debug(`${propertyKey} - Entering -${argsStr}`);

		const now = Date.now();
		const result = originalMethod.apply(this, args);

		const exitLog = () => {
			logger.debug(`${propertyKey} - Exited after ${Date.now() - now}ms`);
		};

		if (typeof result === "object" && typeof result.then === "function") {
			const promise = result.then(exitLog);
			if (typeof promise.catch === "function") {
				promise.catch((e: any) => e);
			}
		} else {
			exitLog();
		}

		return result;
	};

}


