import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { Stack, Typography } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { DeleteEntity } from "@components/entity/DeleteEntity";
import { useParams } from "react-router";
import { manageLocalDeploy } from "@modules/deploys/deploys.async.actions";
import { AddLocalDeploy } from "@components/deploys/local/AddLocalDeploy";
import { UnableToFindEntity } from "@components/entity/UnableToFindEntity";
import { IconWithTooltip } from "@components/utils/tooltip/IconWithTooltip";
import { usePermissions } from "@hooks/usePermissions";
import { BackupMakerRole } from "@apis/authentication/generated";

export function LocalDeploy() {
	const { locals } = useAppSelector((s) => ({
		locals: s.deploys.local,
	}));

	const { name } = useParams<{
		name: string;
	}>();

	const deploy = useMemo(() => Object.values(locals).find((deploy) => deploy.name === name), [locals, name]);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	const isAdmin = usePermissions(BackupMakerRole.Admin);

	if (!deploy) return <UnableToFindEntity description={"local deployment configuration"} name={name!} />;

	return (
		<Stack height={"100%"} className={"MongoConnection"}>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<Typography fontSize={"100%"} variant={"overline"}>
					Deploy :
				</Typography>
				<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
					Local/{deploy.name}
				</Typography>
				<IconWithTooltip disabled={!isAdmin} title={"Update the mongo deployment"} disabledTitle={"You must be an admin"} onClick={updateModal.setOpen} color={"warning"}>
					<Edit />
				</IconWithTooltip>
				<IconWithTooltip disabled={!isAdmin} title={"Delete the mongo deployment"} disabledTitle={"You must be an admin"} onClick={deleteModal.setOpen} color={"error"}>
					<DeleteForever />
				</IconWithTooltip>
			</Stack>

			{deploy && (
				<>
					<Stack alignItems={"center"} my={2} spacing={1} direction={"row"}>
						<Typography variant={"overline"}>Output Path :</Typography>
						<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
							{deploy.outputPath}
						</Typography>
					</Stack>
					<DeleteEntity
						setClose={deleteModal.setClose}
						open={deleteModal.open}
						title={"Delete mongo deployment config"}
						deleteFn={manageLocalDeploy.delete}
						entity={deploy}
						description={"mongo deployment config"}
					/>
					<AddLocalDeploy open={updateModal.open} setClose={updateModal.setClose} update={deploy.id} />
				</>
			)}
		</Stack>
	);
}
