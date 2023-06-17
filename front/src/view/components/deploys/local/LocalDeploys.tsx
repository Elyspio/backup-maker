import { useAppDispatch, useAppSelector } from "@store";
import React, { useMemo } from "react";
import { Button, Stack } from "@mui/material";
import { push } from "redux-first-history";
import { getDeployRoute } from "@/config/routes";

export function LocalDeploys() {
	const deployments = useAppSelector((s) => s.deploys.locals);

	const dispatch = useAppDispatch();
	const deployElements = useMemo(() => {
		return Object.values(deployments).map((deploy) => (
			<Button
				color={"secondary"}
				key={deploy.id}
				size={"small"}
				onClick={() => {
					dispatch(push(getDeployRoute("local", deploy), deploy));
				}}
			>
				Local/{deploy.name}
			</Button>
		));
	}, [dispatch, deployments]);

	return <Stack spacing={1}>{deployElements}</Stack>;
}
