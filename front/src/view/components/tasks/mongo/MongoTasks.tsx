import { useAppDispatch, useAppSelector } from "@store";
import React, { useMemo } from "react";
import { Button, Stack } from "@mui/material";
import { push } from "redux-first-history";
import { getTaskRoute } from "@/config/routes";

export function MongoTasks() {
	const tasks = useAppSelector((s) => s.tasks.mongo);

	const dispatch = useAppDispatch();
	const deployElements = useMemo(() => {
		return Object.values(tasks).map((deploy) => (
			<Button
				color={"secondary"}
				key={deploy.id}
				size={"small"}
				onClick={() => {
					dispatch(push(getTaskRoute("mongo", deploy), deploy));
				}}
			>
				Mongo/{deploy.name}
			</Button>
		));
	}, [dispatch, tasks]);

	return <Stack spacing={1}>{deployElements}</Stack>;
}
