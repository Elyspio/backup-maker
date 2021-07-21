import {Server} from "../../../src/web/server"
import {PlatformExpress} from "@tsed/platform-express";
import *  as Apis from "../api"
import {SaveTypeEnum, TaskOnTypeEnum, TaskWorkListTypeEnum} from "../api"

const port = 7001
describe("Rest", () => {

	const api = new Apis.TaskApi(undefined, `http://localhost:${port}`)

	beforeAll(async () => {
		const platform = await PlatformExpress.bootstrap(Server, {httpPort: port, port});
		await platform.listen();
	});


	describe("POST /api/task/{id}/stop", () => {

		it("No Content", async () => {
//                    const data: any = {};
//                    const ret = await new Apis.TaskApi(undefined, "http://localhost:" + port).taskStopTask(data);
//                    expect(ret.status).toEqual(204);
		});
	});


	describe("POST /api/task/add", () => {

		it("No Content", async () => {
			const data: Apis.AddTask = {
				work: {
					save: {
						path: "/dump.ssh",
						type: SaveTypeEnum.Local,
					},
					on: {
						connectionInfo: {
							port: 2222,
							password: "jgjfunac0!",
							host: "rama2.synology.me",
							username: "jojo"
						},
						type: TaskOnTypeEnum.Ssh,
						folder: "/volume2/media/videos/animes/seen"
					},
					type: TaskWorkListTypeEnum.List
				},
				schedule: {
					interval: 1000
				}
			};
			const ret = await api.taskCreateTask(data);
			expect(ret.status).toEqual(204);

			const {data: conf} = await api.taskGetConfig();
			expect(conf.tasks.find(t => t.id === ret.data)).not.toBeUndefined();


		});
	});


	describe("GET /api/task/config", () => {

		it("Success", async () => {
//                    const data: any = {};
//                    const ret = await new Apis.TaskApi(undefined, "http://localhost:" + port).taskGetConfig(data);
//                    expect(ret.status).toEqual(200);
		});
	});


	describe("POST /api/task/run", () => {

		it("No Content", async () => {
//                    const data: any = {};
//                    const ret = await new Apis.TaskApi(undefined, "http://localhost:" + port).taskRunAllTask(data);
//                    expect(ret.status).toEqual(204);
		});
	});


	describe("POST /api/task/{id}/run", () => {

		it("No Content", async () => {
//                    const data: any = {};
//                    const ret = await new Apis.TaskApi(undefined, "http://localhost:" + port).taskRunTask(data);
//                    expect(ret.status).toEqual(204);
		});
	});

});
