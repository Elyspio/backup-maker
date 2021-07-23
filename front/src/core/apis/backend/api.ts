/* tslint:disable */
/* eslint-disable */
/**
 * Api documentation
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import {Configuration} from './configuration';
import globalAxios, {AxiosInstance, AxiosPromise} from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
	assertParamExists,
	createRequestFunction,
	DUMMY_BASE_URL,
	serializeDataIfNeeded,
	setApiKeyToObject,
	setBasicAuthToObject,
	setBearerAuthToObject,
	setOAuthToObject,
	setSearchParams,
	toPathString
} from './common';
// @ts-ignore
import {BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError} from './base';

/**
 *
 * @export
 * @interface AddTask
 */
export interface AddTask {
	/**
	 *
	 * @type {ScheduleLight}
	 * @memberof AddTask
	 */
	schedule: ScheduleLight;
	/**
	 *
	 * @type {TaskWorkList}
	 * @memberof AddTask
	 */
	work: TaskWorkList;
}

/**
 *
 * @export
 * @interface ConnectionInfo
 */
export interface ConnectionInfo {
	/**
	 * Hostname or IP address of the server.
	 * @type {string}
	 * @memberof ConnectionInfo
	 */
	host: string;
	/**
	 * Port number of the server.
	 * @type {number}
	 * @memberof ConnectionInfo
	 */
	port: number;
	/**
	 * Username for authentication.
	 * @type {string}
	 * @memberof ConnectionInfo
	 */
	username: string;
	/**
	 * Password for password-based user authentication.
	 * @type {string}
	 * @memberof ConnectionInfo
	 */
	password?: string;
	/**
	 * Private key (base64 encoded).
	 * @type {string}
	 * @memberof ConnectionInfo
	 */
	privateKey?: string;
}

/**
 *
 * @export
 * @interface Save
 */
export interface Save {
	/**
	 *
	 * @type {string}
	 * @memberof Save
	 */
	type: SaveTypeEnum;
	/**
	 *
	 * @type {ConnectionInfo}
	 * @memberof Save
	 */
	connectionInfo?: ConnectionInfo;
	/**
	 *
	 * @type {string}
	 * @memberof Save
	 */
	path: string;
}

/**
 * @export
 * @enum {string}
 */
export enum SaveTypeEnum {
	Ssh = 'ssh',
	Local = 'local'
}

/**
 *
 * @export
 * @interface Schedule
 */
export interface Schedule {
	/**
	 *
	 * @type {number}
	 * @memberof Schedule
	 */
	interval: number;
	/**
	 * State of the task
	 * @type {string}
	 * @memberof Schedule
	 */
	state: ScheduleStateEnum;
	/**
	 *
	 * @type {string}
	 * @memberof Schedule
	 */
	lastRun?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum ScheduleStateEnum {
	Running = 'running',
	Stopped = 'stopped',
	Waiting = 'waiting'
}

/**
 *
 * @export
 * @interface ScheduleLight
 */
export interface ScheduleLight {
	/**
	 *
	 * @type {number}
	 * @memberof ScheduleLight
	 */
	interval: number;
}

/**
 *
 * @export
 * @interface ServiceConfig
 */
export interface ServiceConfig {
	/**
	 *
	 * @type {Array<Task>}
	 * @memberof ServiceConfig
	 */
	tasks: Array<Task>;
}

/**
 *
 * @export
 * @interface Task
 */
export interface Task {
	/**
	 *
	 * @type {number}
	 * @memberof Task
	 */
	id: number;
	/**
	 *
	 * @type {Schedule}
	 * @memberof Task
	 */
	schedule: Schedule;
	/**
	 *
	 * @type {TaskWorkList}
	 * @memberof Task
	 */
	work: TaskWorkList;
}

/**
 *
 * @export
 * @interface TaskOn
 */
export interface TaskOn {
	/**
	 *
	 * @type {ConnectionInfo}
	 * @memberof TaskOn
	 */
	connectionInfo?: ConnectionInfo;
	/**
	 *
	 * @type {string}
	 * @memberof TaskOn
	 */
	folder: string;
	/**
	 *
	 * @type {string}
	 * @memberof TaskOn
	 */
	type: TaskOnTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum TaskOnTypeEnum {
	Local = 'local',
	Ssh = 'ssh'
}

/**
 *
 * @export
 * @interface TaskWorkList
 */
export interface TaskWorkList {
	/**
	 *
	 * @type {string}
	 * @memberof TaskWorkList
	 */
	type: TaskWorkListTypeEnum;
	/**
	 *
	 * @type {TaskOn}
	 * @memberof TaskWorkList
	 */
	on: TaskOn;
	/**
	 *
	 * @type {Save}
	 * @memberof TaskWorkList
	 */
	save: Save;
}

/**
 * @export
 * @enum {string}
 */
export enum TaskWorkListTypeEnum {
	List = 'list'
}


/**
 * TaskApi - axios parameter creator
 * @export
 */
export const TaskApiAxiosParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * Add a local config
		 * @param {AddTask} addTask
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskCreateTask: async (addTask: AddTask, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'addTask' is not null or undefined
			assertParamExists('taskCreateTask', 'addTask', addTask)
			const localVarPath = `/api/task/add`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			localVarHeaderParameter['Content-Type'] = 'application/json';

			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
			localVarRequestOptions.data = serializeDataIfNeeded(addTask, localVarRequestOptions, configuration)

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskDeleteTask: async (id: number, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'id' is not null or undefined
			assertParamExists('taskDeleteTask', 'id', id)
			const localVarPath = `/api/task/{id}`
				.replace(`{${"id"}}`, encodeURIComponent(String(id)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'DELETE', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 * Get all configs
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskGetConfig: async (options: any = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/task/config`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskRunAllTask: async (options: any = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/task/run`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskRunTask: async (id: number, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'id' is not null or undefined
			assertParamExists('taskRunTask', 'id', id)
			const localVarPath = `/api/task/{id}/run`
				.replace(`{${"id"}}`, encodeURIComponent(String(id)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskStopTask: async (id: number, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'id' is not null or undefined
			assertParamExists('taskStopTask', 'id', id)
			const localVarPath = `/api/task/{id}/stop`
				.replace(`{${"id"}}`, encodeURIComponent(String(id)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
	}
};

/**
 * TaskApi - functional programming interface
 * @export
 */
export const TaskApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = TaskApiAxiosParamCreator(configuration)
	return {
		/**
		 * Add a local config
		 * @param {AddTask} addTask
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async taskCreateTask(addTask: AddTask, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.taskCreateTask(addTask, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async taskDeleteTask(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.taskDeleteTask(id, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 * Get all configs
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async taskGetConfig(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServiceConfig>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.taskGetConfig(options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async taskRunAllTask(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.taskRunAllTask(options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async taskRunTask(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.taskRunTask(id, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async taskStopTask(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.taskStopTask(id, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
	}
};

/**
 * TaskApi - factory interface
 * @export
 */
export const TaskApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
	const localVarFp = TaskApiFp(configuration)
	return {
		/**
		 * Add a local config
		 * @param {AddTask} addTask
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskCreateTask(addTask: AddTask, options?: any): AxiosPromise<number> {
			return localVarFp.taskCreateTask(addTask, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskDeleteTask(id: number, options?: any): AxiosPromise<void> {
			return localVarFp.taskDeleteTask(id, options).then((request) => request(axios, basePath));
		},
		/**
		 * Get all configs
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskGetConfig(options?: any): AxiosPromise<ServiceConfig> {
			return localVarFp.taskGetConfig(options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskRunAllTask(options?: any): AxiosPromise<void> {
			return localVarFp.taskRunAllTask(options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskRunTask(id: number, options?: any): AxiosPromise<void> {
			return localVarFp.taskRunTask(id, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {number} id
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		taskStopTask(id: number, options?: any): AxiosPromise<void> {
			return localVarFp.taskStopTask(id, options).then((request) => request(axios, basePath));
		},
	};
};

/**
 * TaskApi - object-oriented interface
 * @export
 * @class TaskApi
 * @extends {BaseAPI}
 */
export class TaskApi extends BaseAPI {
	/**
	 * Add a local config
	 * @param {AddTask} addTask
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TaskApi
	 */
	public taskCreateTask(addTask: AddTask, options?: any) {
		return TaskApiFp(this.configuration).taskCreateTask(addTask, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {number} id
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TaskApi
	 */
	public taskDeleteTask(id: number, options?: any) {
		return TaskApiFp(this.configuration).taskDeleteTask(id, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 * Get all configs
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TaskApi
	 */
	public taskGetConfig(options?: any) {
		return TaskApiFp(this.configuration).taskGetConfig(options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TaskApi
	 */
	public taskRunAllTask(options?: any) {
		return TaskApiFp(this.configuration).taskRunAllTask(options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {number} id
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TaskApi
	 */
	public taskRunTask(id: number, options?: any) {
		return TaskApiFp(this.configuration).taskRunTask(id, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {number} id
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TaskApi
	 */
	public taskStopTask(id: number, options?: any) {
		return TaskApiFp(this.configuration).taskStopTask(id, options).then((request) => request(this.axios, this.basePath));
	}
}


