import React, { useCallback } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { StoreState, useAppSelector } from "@store";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { createSelector } from "@reduxjs/toolkit";
import { AddLocalDeploy } from "@components/deploys/local/AddLocalDeploy";
import { useModal } from "@hooks/useModal";
import { AddFtpDeploy } from "@components/deploys/ftp/AddFtpDeploy";
import { AddEntityProps } from "@components/entity/EntityManager";
import { JobDeploy } from "@apis/backend/generated";
import Divider from "@mui/material/Divider";

const selector = createSelector([(s: StoreState) => s.deploys], ({ ftp, local }) => ({
	ftp: Object.keys(ftp),
	local: Object.keys(local),
}));

export function AddDeploy({ open, setClose, update }: AddEntityProps<IdConnection>) {
	const { ftp, local } = useAppSelector(selector);

	const ftpModal = useModal(!!update && ftp.includes(update));
	const localModal = useModal(!!update && local.includes(update));

	const setOpen = useCallback(
		(type: JobDeploy) => () => {
			const setters: Record<JobDeploy, () => void> = {
				[JobDeploy.Local]: localModal.open ? localModal.setClose : localModal.setOpen,
				[JobDeploy.Ftp]: ftpModal.open ? ftpModal.setClose : ftpModal.setOpen,
			};
			setters[type]();
		},
		[ftpModal.open, ftpModal.setClose, ftpModal.setOpen, localModal.open, localModal.setClose, localModal.setOpen]
	);

	const close = useCallback(
		(type: JobDeploy) => () => {
			const closeFn: Record<JobDeploy, () => void> = {
				[JobDeploy.Local]: localModal.setClose,
				[JobDeploy.Ftp]: ftpModal.setClose,
			};
			closeFn[type]();
			setClose();
		},
		[ftpModal.setClose, localModal.setClose, setClose]
	);

	return (
		<>
			<Dialog open={!ftpModal.open && !localModal.open && open} onClose={setClose} maxWidth={"xs"} fullWidth>
				<DialogTitle align={"center"}>Choose the deployment type</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={3} p={3} direction={"row"} alignItems={"center"} justifyContent={"center"}>
						<Button size={"large"} onClick={setOpen(JobDeploy.Local)} variant={"outlined"} color={"inherit"}>
							Local
						</Button>
						<Divider sx={{ height: 30, width: "1px" }} />
						<Button size={"large"} onClick={setOpen(JobDeploy.Ftp)} variant={"outlined"} color={"inherit"}>
							FTP
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>

			<AddLocalDeploy open={localModal.open} setClose={close(JobDeploy.Local)} update={update} />
			<AddFtpDeploy open={ftpModal.open} setClose={close(JobDeploy.Ftp)} update={update} />
		</>
	);
}
