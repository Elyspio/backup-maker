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
import { UnableToFindEntity } from "@components/entity/UnableToFindEntity";
import { IdTask } from "@modules/tasks/tasks.types";

interface MongoTaskProps {
	readonly?: boolean;
	idTask?: IdTask;
}

export function MongoTask({ readonly, idTask }: MongoTaskProps) {
	const { mongoTasks, connections } = useAppSelector((s) => ({
		mongoTasks: s.tasks.mongo,
		connections: s.databases.mongo.connections,
	}));

	const { name } = useParams<{
		name: string;
	}>();

	const task = useMemo(() => Object.values(mongoTasks).find((t) => t.name === name || t.id === idTask), [idTask, mongoTasks, name]);

	const connection = useMemo(() => Object.values(connections).find((con) => con.id === task?.idConnection), [connections, task?.idConnection]);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	if (!task) return <UnableToFindEntity description={"task configuration"} name={name!} />;

	if (!connection) return <UnableToFindEntity description={"mongo connection"} name={name!} />;

	return (
		<Stack>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<Typography fontSize={"100%"} variant={"overline"}>
					Tasks :
				</Typography>
				<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
					Mongo/{task.name}
				</Typography>
				{!readonly && (
					<>
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
					</>
				)}
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
