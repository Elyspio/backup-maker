import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { IconButton, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { DeleteEntity } from "@components/entity/DeleteEntity";
import { useParams } from "react-router";
import { manageLocalDeploy } from "@modules/deploys/local/deploy.async.actions";
import { AddLocalDeploy } from "@components/deploys/local/AddLocalDeploy";

enum ColumnField {
	Name = "name",
	Count = "count",
	SizeTotal = "sizes/total",
	SizeDocuments = "sizes/documents",
	SizeIndexes = "sizes/indexes",
}

const rootSx: SxProps = {
	".MuiDataGrid-footerContainer.MuiDataGrid-withBorderColor": {
		display: "none",
	},
};

export function LocalDeploy() {
	const { locals } = useAppSelector((s) => ({
		locals: s.deploys.locals,
	}));

	const { name } = useParams<{
		name: string;
	}>();

	const deploy = useMemo(() => Object.values(locals).find((deploy) => deploy.name === name), [locals, name]);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	if (!deploy)
		return (
			<Stack alignItems={"center"} justifyContent={"center"} height={"100%"} width={"100%"}>
				<Typography variant={"h4"}>
					Unable to find the local deploymeny configuration{" "}
					<Typography component={"span"} fontSize={"110%"} color={"error"}>
						"{name}"
					</Typography>
				</Typography>
			</Stack>
		);

	return (
		<Stack height={"100%"} className={"MongoConnection"} sx={rootSx}>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<Typography fontSize={"100%"} variant={"overline"}>
					Deploy :
				</Typography>
				<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
					Local/{deploy.name}
				</Typography>
				<Tooltip title={"Update the local deployment"}>
					<IconButton color={"warning"} onClick={updateModal.setOpen}>
						<Edit />
					</IconButton>
				</Tooltip>
				<Tooltip title={"Delete the local deployment"}>
					<IconButton color={"error"} onClick={deleteModal.setOpen}>
						<DeleteForever />
					</IconButton>
				</Tooltip>
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
						title={"Delete local deployment config"}
						deleteFn={manageLocalDeploy.delete}
						entity={deploy}
						description={"local deployment config"}
					/>
					<AddLocalDeploy open={updateModal.open} setClose={updateModal.setClose} update={deploy.id} />
				</>
			)}
		</Stack>
	);
}
