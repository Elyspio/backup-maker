import React from "react";
import { Box, Stack } from "@mui/material";
import { Route, Routes } from "react-router";
import { AppRoutes } from "@/config/routes";
import { MongoConnection } from "@components/connections/mongo/MongoConnection";
import { Connections } from "@components/connections/Connections";
import { Deploys } from "@components/deploys/Deploys";
import { LocalDeploy } from "@components/deploys/local/LocalDeploy";
import { Tasks } from "@components/tasks/Tasks";
import { Jobs } from "@components/jobs/Jobs";
import { MongoTask } from "@components/tasks/mongo/MongoTask";
import { JobDetail } from "@components/jobs/JobDetail";

export function AppRouter() {
	return (
		<Stack direction={"row"} spacing={3} width={"100%"} height={"100%"}>
			<Stack spacing={2} px={2}>
				<Connections />
				<Deploys />
				<Tasks />
				<Jobs />
			</Stack>

			<Box bgcolor={"background.paper"} p={2} width={"100%"}>
				<Routes>
					<Route path={AppRoutes.mongoConnection} element={<MongoConnection />} />
					<Route path={AppRoutes.mongoTask} element={<MongoTask />} />
					<Route path={AppRoutes.localDeploy} element={<LocalDeploy />} />
					<Route path={AppRoutes.job} element={<JobDetail />} />
				</Routes>
			</Box>
		</Stack>
	);
}
