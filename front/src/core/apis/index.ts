import {TaskApi} from "./backend"

export const Apis = {
	task: new TaskApi(undefined, window.config.endpoints.core)
}

