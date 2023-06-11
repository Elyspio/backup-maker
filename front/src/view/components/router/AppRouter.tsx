import React from "react";
import { Box, Stack } from "@mui/material";
import { Route, Routes } from "react-router";
import { appRoutes } from "@/config/routes";
import { MongoConnection } from "@components/connections/mongo/MongoConnection";
import { Connections } from "@components/connections/Connections";

export function AppRouter() {
	return (
		<Stack direction={"row"} spacing={3} width={"100%"} height={"100%"}>
			<Box bgcolor={"background.paper"} p={2}>
				<Connections />
			</Box>

			<Box bgcolor={"background.paper"} p={2} width={"100%"}>
				<Routes>
					<Route path={appRoutes.mongoConnection} element={<MongoConnection />} />
				</Routes>
			</Box>
		</Stack>
	);
}
