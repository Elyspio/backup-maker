import {Logger} from "@tsed/logger";
import {Helper} from "../helper";


declare global {
	interface Function {
		logger: Logger
	}
}


export const Log = (logger: Logger, logOnly: number[] | false = []) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	let originalMethod = descriptor.value


	const argsName = Helper.getFunctionArgs(originalMethod);

	descriptor.value = function (...args: any[]) {
		let argsStr = ""

		if (logOnly !== false) {
			argsStr = argsName.reduce((previousValue, currentValue, currentIndex) => {
				if (logOnly.length > 0) {
					if (!logOnly.includes(currentIndex)) return previousValue;
				}
				return `${previousValue} ${currentValue}=${JSON.stringify(args[currentIndex])}`
			}, "-");
		}

		logger.info(`${propertyKey} - Entering ${argsStr}`);

		const now = Date.now();
		const result = originalMethod.apply(this, args);

		const exitLog = () => {
			logger.info(`${propertyKey} - Exited after ${Date.now() - now}ms`);
		};

		if (typeof result === "object" && typeof result.then === "function") {
			const promise = result.then((ret) => {
				exitLog();
				return ret;
			});
			if (typeof promise.catch === "function") {
				promise.catch((e: any) => {
					logger.error(`${propertyKey} - Error ${e}`)
					return e
				});
			}
		} else {
			exitLog();
		}

		return result;
	};

}


