import React, { useCallback, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { usePropsState } from "@hooks/usePropsState";
import { manageLocalDeploy } from "@modules/deploys/local/deploy.async.actions";

export interface AddEntityProps<T> {
	open: boolean;
	setClose: () => void;
	update?: T;
}

export function AddLocalDeploy({ open, setClose, update }: AddEntityProps<IdConnection>) {
	const previousValue = useAppSelector((s) => s.deploys.locals[update!]);

	const dispatch = useAppDispatch();

	const [name, setName] = usePropsState(previousValue?.name ?? "");
	const [outputPath, setOutputPath] = useState(previousValue?.outputPath ?? "");

	const updateField = useCallback(
		(field: "name" | "outputPath") => (e: React.ChangeEvent<HTMLInputElement>) => {
			const fn = field === "outputPath" ? setOutputPath : setName;
			fn(e.target.value);
		},
		[setName]
	);

	const createNewLocalDeploy = useCallback(() => {
		const action = !update
			? manageLocalDeploy.add({
					name,
					outputPath,
			  })
			: manageLocalDeploy.update({
					name,
					outputPath,
					id: update,
			  });

		dispatch(action as AsyncThunkAction<any, any, any>);
		setClose();
	}, [update, name, outputPath, dispatch, setClose]);

	return (
		<Dialog open={open} onClose={setClose} maxWidth={"md"} fullWidth>
			<DialogTitle>{update ? "Update" : "Create"} a local deployment configuration</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3} p={3}>
					<TextField onChange={updateField("name")} disabled={!!update} value={name} label={"Name"} />
					<TextField onChange={updateField("outputPath")} value={outputPath} label={"Output path"} />
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={3}>
					<Button color={"primary"} variant={"outlined"} onClick={createNewLocalDeploy}>
						Add
					</Button>
					<Button color={"inherit"} variant={"outlined"} onClick={setClose}>
						Cancel
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
