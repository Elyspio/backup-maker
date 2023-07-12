import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { Stack } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { DeleteEntity } from "@components/entity/DeleteEntity";
import { useParams } from "react-router";
import { manageLocalDeploy } from "@modules/deploys/deploys.async.actions";
import { UnableToFindEntity } from "@components/entity/UnableToFindEntity";
import { MongoBackupTaskData } from "@apis/backend/generated";
import { usePermissions } from "@hooks/usePermissions";
import { BackupMakerRole } from "@apis/authentication/generated";
import { IconWithTooltip } from "@components/utils/tooltip/IconWithTooltip";
import { EntitySubProperty } from "@components/entity/EntitySubProperty";
import { AddFtpDeploy } from "@components/deploys/ftp/AddFtpDeploy";
import { slugifyRoute } from "@/config/routes";
import { EntityTitle } from "@components/entity/EntityTitle";

interface LocalDeployProps {
	readonly?: boolean;
	idDeploy?: MongoBackupTaskData["id"];
}

export function FtpDeploy({ readonly, idDeploy }: LocalDeployProps) {
	const { ftps } = useAppSelector((s) => ({
		ftps: s.deploys.ftp,
	}));

	const { slug } = useParams<{
		slug: string;
	}>();

	const deploy = useMemo(() => Object.values(ftps).find((ftp) => slugifyRoute(ftp.name) === slug || ftp.id === idDeploy), [idDeploy, ftps, slug]);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	const isAdmin = usePermissions(BackupMakerRole.Admin);

	if (!deploy) return <UnableToFindEntity description={"FTP deployment configuration"} name={slug!} />;

	return (
		<Stack>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<EntityTitle name={"Deploy"} value={`FTP/${deploy.name}`} />

				{!readonly && (
					<>
						<IconWithTooltip
							disabled={!isAdmin}
							title={"Update the FTP deployment"}
							disabledTitle={"You must be an admin"}
							onClick={updateModal.setOpen}
							color={"warning"}
						>
							<Edit />
						</IconWithTooltip>
						<IconWithTooltip
							disabled={!isAdmin}
							title={"Delete the FTP deployment"}
							disabledTitle={"You must be an admin"}
							onClick={deleteModal.setOpen}
							color={"error"}
						>
							<DeleteForever />
						</IconWithTooltip>
					</>
				)}
			</Stack>

			{deploy && (
				<>
					<Stack>
						<EntitySubProperty name={"Output Path"} value={deploy.outputPath} />
						<EntitySubProperty name={"Host"} value={`${deploy.connection.host}:${deploy.connection.port}`} />
						<EntitySubProperty name={"Username"} value={deploy.connection.username} />
						<EntitySubProperty name={"Encryption"} value={deploy.connection.encryption} />
					</Stack>
					<DeleteEntity
						setClose={deleteModal.setClose}
						open={deleteModal.open}
						title={"Delete mongo deployment config"}
						deleteFn={manageLocalDeploy.delete}
						entity={deploy}
						description={"mongo deployment config"}
					/>
					<AddFtpDeploy open={updateModal.open} setClose={updateModal.setClose} update={deploy.id} />
				</>
			)}
		</Stack>
	);
}
