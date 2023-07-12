import React, { useCallback, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { manageMongoConnections } from "@modules/databases/mongo/mongo.database.async.actions";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { usePropsState } from "@hooks/usePropsState";
import { AddEntityProps } from "@components/entity/EntityManager";

export function AddMongoConnection({ open, setClose, update }: AddEntityProps<IdConnection>) {
	const updateName = useAppSelector((s) => s.databases.mongo.connections[update!]?.name);

	const dispatch = useAppDispatch();

	const [name, setName] = usePropsState(updateName ?? "");
	const [connectionString, setConnectionString] = useState("");

	const updateField = useCallback(
		(field: "name" | "connectionString") => (e: React.ChangeEvent<HTMLInputElement>) => {
			const fn = field === "connectionString" ? setConnectionString : setName;
			fn(e.target.value);
		},
		[setName]
	);

	const createNewConnection = useCallback(() => {
		const action = !update
			? manageMongoConnections.add({
					name,
					connectionString,
			  })
			: manageMongoConnections.updateConnectionString({
					connectionString,
					idConnection: update,
			  });

		dispatch(action as AsyncThunkAction<any, any, any>);
		setClose();
	}, [update, name, connectionString, dispatch, setClose]);

	return (
		<Dialog open={open} onClose={setClose} maxWidth={"xs"} fullWidth>
			<DialogTitle align={"center"}>{update ? "Update" : "Create"} a mongodb connection</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3} p={3}>
					<TextField onChange={updateField("name")} disabled={!!update} value={name} label={"Name"} />
					<TextField onChange={updateField("connectionString")} value={connectionString} label={"Connection String"} />
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={3}>
					<Button color={"primary"} variant={"outlined"} onClick={createNewConnection}>
						{update ? "Update" : "Add"}
					</Button>
					<Button color={"inherit"} variant={"outlined"} onClick={setClose}>
						Cancel
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
