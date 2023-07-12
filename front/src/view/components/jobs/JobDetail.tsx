import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { Stack } from "@mui/material";
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
import cronstrue from "cronstrue";
import { EntitySubProperty } from "@components/entity/EntitySubProperty";
import { slugifyRoute } from "@/config/routes";
import { FtpDeploy } from "@components/deploys/ftp/FtpDeploy";
import { EntityTitle } from "@components/entity/EntityTitle";
import { IconWithTooltip } from "@components/utils/tooltip/IconWithTooltip";
import { usePermissions } from "@hooks/usePermissions";

export function JobDetail() {
	const { jobs, tasks, deploys } = useAppSelector((s) => ({
		jobs: s.jobs.data,
		tasks: s.tasks,
		deploys: s.deploys,
	}));

	const { slug } = useParams<{
		slug: string;
	}>();

	const job = useMemo(() => Object.values(jobs).find((deploy) => slugifyRoute(deploy.name) === slug), [jobs, slug]);

	const task = useMemo(
		() => Object.values(job?.backupType === "Mongo" ? tasks.mongo : {}).find((deploy) => deploy.id === job?.idBackup),
		[job?.backupType, job?.idBackup, tasks.mongo]
	);

	const deploy = useMemo(
		() => Object.values(job?.deployType === "Local" ? deploys.local : deploys.ftp).find((deploy) => deploy.id === job?.idDeploy),
		[deploys.ftp, deploys.local, job?.deployType, job?.idDeploy]
	);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	const isAdmin = usePermissions("Admin");

	if (!job) return <UnableToFindEntity description={"job"} name={slug!} />;
	if (!deploy) return <UnableToFindEntity description={`${job.deployType} deploy configuration with id`} name={job.idDeploy} />;
	if (!task) return <UnableToFindEntity description={`${job.backupType} task configuration with id`} name={job.idBackup} />;

	return (
		<Stack height={"100%"}>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<EntityTitle name={"Job"} value={deploy.name} />

				<IconWithTooltip disabled={!isAdmin} title={"Update the job configuration"} disabledTitle={"You must be an admin"} onClick={updateModal.setOpen} color={"warning"}>
					<Edit />
				</IconWithTooltip>

				<IconWithTooltip disabled={!isAdmin} title={"Delete the job configuration"} disabledTitle={"You must be an admin"} onClick={deleteModal.setOpen} color={"error"}>
					<DeleteForever />
				</IconWithTooltip>
			</Stack>

			{job && (
				<Stack spacing={2} pt={2}>
					<EntitySubProperty name={"Cron Interval"} value={cronstrue.toString(job.cronInterval)} />

					<Divider />

					<Stack spacing={3} direction={"row"}>
						<Stack width={"100%"}>{job.backupType === "Mongo" && <MongoTask idTask={job.idBackup} readonly />}</Stack>
						<Divider orientation={"vertical"} />
						<Stack width={"100%"}>
							{job.deployType === "Local" && <LocalDeploy idDeploy={job.idDeploy} readonly />}
							{job.deployType === "Ftp" && <FtpDeploy idDeploy={job.idDeploy} readonly />}
						</Stack>
					</Stack>

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
