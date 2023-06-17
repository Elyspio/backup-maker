import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { DeleteEntity } from "@components/entity/DeleteEntity";
import { useParams } from "react-router";
import { manageMongoTasks } from "@modules/tasks/tasks.async.actions";
import { AddMongoTask } from "@components/tasks/mongo/AddMongoTask";
import { MongoTaskDetail } from "@components/tasks/mongo/MongoTaskDetail";

export function MongoTask() {
	const { mongoTasks, connections } = useAppSelector((s) => ({
		mongoTasks: s.tasks.mongo,
		connections: s.databases.mongo.connections,
	}));

	const { name } = useParams<{
		name: string;
	}>();

	const task = useMemo(() => Object.values(mongoTasks).find((deploy) => deploy.name === name), [mongoTasks, name]);

	const connection = useMemo(() => Object.values(connections).find((con) => con.id === task?.idConnection), [connections, task?.idConnection]);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	if (!task)
		return (
			<Stack alignItems={"center"} justifyContent={"center"} height={"100%"} width={"100%"}>
				<Typography variant={"h4"}>
					Unable to find the mongo task configuration{" "}
					<Typography component={"span"} fontSize={"110%"} color={"error"}>
						"{name}"
					</Typography>
				</Typography>
			</Stack>
		);

	if (!connection)
		return (
			<Stack alignItems={"center"} justifyContent={"center"} height={"100%"} width={"100%"}>
				<Typography variant={"h4"}>
					Unable to find the mongo connection{" "}
					<Typography component={"span"} fontSize={"110%"} color={"error"}>
						"{name}"
					</Typography>
				</Typography>
			</Stack>
		);

	return (
		<Stack height={"100%"} className={"MongoConnection"}>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<Typography fontSize={"100%"} variant={"overline"}>
					Tasks :
				</Typography>
				<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
					Mongo/{task.name}
				</Typography>
				<Tooltip title={"Update the mongo task"}>
					<IconButton color={"warning"} onClick={updateModal.setOpen}>
						<Edit />
					</IconButton>
				</Tooltip>
				<Tooltip title={"Delete the mongo task"}>
					<IconButton color={"error"} onClick={deleteModal.setOpen}>
						<DeleteForever />
					</IconButton>
				</Tooltip>
			</Stack>

			{task && (
				<>
					<MongoTaskDetail task={task} connection={connection} />
					<DeleteEntity
						setClose={deleteModal.setClose}
						open={deleteModal.open}
						title={"Delete mongo task config"}
						deleteFn={manageMongoTasks.delete}
						entity={task}
						description={"mongo task config"}
					/>
					<AddMongoTask open={updateModal.open} setClose={updateModal.setClose} update={task.id} />
				</>
			)}
		</Stack>
	);
}
