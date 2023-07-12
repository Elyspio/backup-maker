import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { Stack } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { DeleteEntity } from "@components/entity/DeleteEntity";
import { useParams } from "react-router";
import { manageMongoTasks } from "@modules/tasks/tasks.async.actions";
import { AddMongoTask } from "@components/tasks/mongo/AddMongoTask";
import { MongoTaskDetail } from "@components/tasks/mongo/MongoTaskDetail";
import { UnableToFindEntity } from "@components/entity/UnableToFindEntity";
import { IdTask } from "@modules/tasks/tasks.types";
import { IconWithTooltip } from "@components/utils/tooltip/IconWithTooltip";
import { usePermissions } from "@hooks/usePermissions";
import { BackupMakerRole } from "@apis/authentication/generated";
import { slugifyRoute } from "@/config/routes";
import { EntityTitle } from "@components/entity/EntityTitle";

interface MongoTaskProps {
	readonly?: boolean;
	idTask?: IdTask;
}

export function MongoTask({ readonly, idTask }: MongoTaskProps) {
	const { mongoTasks, connections } = useAppSelector((s) => ({
		mongoTasks: s.tasks.mongo,
		connections: s.databases.mongo.connections,
	}));

	const { slug } = useParams<{
		slug: string;
	}>();

	const task = useMemo(() => Object.values(mongoTasks).find((t) => slugifyRoute(t.name) === slug || t.id === idTask), [idTask, mongoTasks, slug]);

	const connection = useMemo(() => Object.values(connections).find((con) => con.id === task?.idConnection), [connections, task?.idConnection]);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	const isAdmin = usePermissions(BackupMakerRole.Admin);

	if (!task) return <UnableToFindEntity description={"task configuration"} name={slug!} />;

	if (!connection) return <UnableToFindEntity description={"mongo connection"} name={slug!} />;

	return (
		<Stack>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<EntityTitle name={"Backup"} value={`Mongo/${task.name}`} />

				{!readonly && (
					<>
						<IconWithTooltip disabled={!isAdmin} title={"Update the mongo task"} disabledTitle={"You must be an admin"} onClick={updateModal.setOpen} color={"warning"}>
							<Edit />
						</IconWithTooltip>
						<IconWithTooltip disabled={!isAdmin} title={"Delete the mongo task"} disabledTitle={"You must be an admin"} onClick={deleteModal.setOpen} color={"error"}>
							<DeleteForever />
						</IconWithTooltip>
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
