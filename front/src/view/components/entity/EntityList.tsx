import { useAppDispatch, useAppSelector } from "@store";
import React, { useMemo } from "react";
import { getConnectionRoute, getDeployRoute, getJobRoute, getTaskRoute } from "@/config/routes";
import { Button, Stack } from "@mui/material";
import { push } from "redux-first-history";

export interface EntityListProps {
	entity: "jobs" | "backup" | "deploy/local" | "deploy/ftp" | "connection";
}

interface EntityParam {
	id: string;
	name: string;
	route: string;
}

export function EntityList({ entity }: EntityListProps) {
	const { jobs, deploys, databases, tasks, pathname } = useAppSelector((s) => ({
		jobs: s.jobs.data,
		tasks: s.tasks,
		deploys: s.deploys,
		databases: s.databases,
		pathname: s.router.location?.pathname,
	}));

	const entities = useMemo(() => {
		switch (entity) {
			case "jobs":
				return Object.values(jobs).map(
					(job): EntityParam => ({
						id: job.id,
						name: job.name,
						route: getJobRoute(job),
					})
				);
			case "backup":
				return [
					...Object.values(tasks.mongo).map(
						(task): EntityParam => ({
							id: task.id,
							name: `mongo/${task.name}`,
							route: getTaskRoute("mongo", task),
						})
					),
				];
			case "deploy/local":
				return [
					...Object.values(deploys.local).map(
						(deploy): EntityParam => ({
							id: deploy.id,
							name: `local/${deploy.name}`,
							route: getDeployRoute("local", deploy),
						})
					),
				];
			case "deploy/ftp":
				return [
					...Object.values(deploys.ftp).map(
						(deploy): EntityParam => ({
							id: deploy.id,
							name: `FTP/${deploy.name}`,
							route: getDeployRoute("ftp", deploy),
						})
					),
				];
			case "connection":
				return [
					...Object.values(databases.mongo.connections).map(
						(con): EntityParam => ({
							id: con.id,
							name: `mongo/${con.name}`,
							route: getConnectionRoute("mongo", con),
						})
					),
				];
		}
	}, [entity, jobs, tasks, deploys, databases]);

	const dispatch = useAppDispatch();
	const elements = useMemo(() => {
		return entities.map((elem) => {
			return (
				<Button
					color={pathname === elem.route ? "primary" : "inherit"}
					key={elem.id}
					size={"small"}
					onClick={() => {
						dispatch(push(elem.route, elem));
					}}
				>
					{elem.name}
				</Button>
			);
		});
	}, [entities, pathname, dispatch]);

	return <Stack spacing={1}>{elements}</Stack>;
}
