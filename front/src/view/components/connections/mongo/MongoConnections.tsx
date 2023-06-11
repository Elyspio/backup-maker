import React, { useMemo } from "react";
import { Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { push } from "redux-first-history";
import { getConnectionRoute } from "@/config/routes";

export function MongoConnections() {
	const connections = useAppSelector((s) => s.databases.mongo.connections);
	const dispatch = useAppDispatch();
	const connectionElements = useMemo(() => {
		return Object.values(connections).map((con) => (
			<Button
				key={con.id}
				size={"small"}
				onClick={() => {
					dispatch(push(getConnectionRoute("mongo", con), con));
				}}
			>
				{con.name}
			</Button>
		));
	}, [dispatch, connections]);

	return <Stack spacing={1}>{connectionElements}</Stack>;
}
