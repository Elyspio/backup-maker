import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { DeleteEntity } from "@components/entity/DeleteEntity";
import { useParams } from "react-router";
import { manageLocalDeploy } from "@modules/deploys/deploys.async.actions";
import { UnableToFindEntity } from "@components/entity/UnableToFindEntity";
import { AddJob } from "@components/jobs/AddJob";
import { LocalDeploy } from "@components/deploys/local/LocalDeploy";
import { MongoTask } from "@components/tasks/mongo/MongoTask";
import Divider from "@mui/material/Divider";

export function JobDetail() {
	const { jobs, tasks, deploys } = useAppSelector((s) => ({
		jobs: s.jobs.data,
		tasks: s.tasks,
		deploys: s.deploys,
	}));

	const { name } = useParams<{
		name: string;
	}>();

	const job = useMemo(() => Object.values(jobs).find((deploy) => deploy.name === name), [jobs, name]);

	const task = useMemo(
		() => Object.values(job?.backupType === "Mongo" ? tasks.mongo : {}).find((deploy) => deploy.id === job?.idBackup),
		[job?.backupType, job?.idBackup, tasks.mongo]
	);

	const deploy = useMemo(
		() => Object.values(job?.deployType === "Local" ? deploys.locals : {}).find((deploy) => deploy.id === job?.idDeploy),
		[deploys.locals, job?.deployType, job?.idDeploy]
	);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	if (!job) return <UnableToFindEntity description={"job"} name={name!} />;
	if (!deploy) return <UnableToFindEntity description={"deploy configuration with id"} name={job.idDeploy} />;
	if (!task) return <UnableToFindEntity description={"task configuration with id"} name={job.idBackup} />;

	return (
		<Stack height={"100%"} className={"MongoConnection"}>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<Typography fontSize={"100%"} variant={"overline"}>
					Job :
				</Typography>
				<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
					{deploy.name}
				</Typography>
				<Tooltip title={"Update the job configuration"}>
					<IconButton color={"warning"} onClick={updateModal.setOpen}>
						<Edit />
					</IconButton>
				</Tooltip>
				<Tooltip title={"Delete the job configuration"}>
					<IconButton color={"error"} onClick={deleteModal.setOpen}>
						<DeleteForever />
					</IconButton>
				</Tooltip>
			</Stack>

			{job && (
				<Stack spacing={2} pt={2}>
					<Divider />
					{job.backupType === "Mongo" && <MongoTask idTask={job.idBackup} readonly />}
					<Divider />
					{job.deployType === "Local" && <LocalDeploy idDeploy={job.idDeploy} readonly />}

					<DeleteEntity
						setClose={deleteModal.setClose}
						open={deleteModal.open}
						title={"Delete job"}
						deleteFn={manageLocalDeploy.delete}
						entity={deploy}
						description={"job"}
					/>
					<AddJob open={updateModal.open} setClose={updateModal.setClose} update={job.id} />
				</Stack>
			)}
		</Stack>
	);
}
