import React, { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { manageMongoConnections } from "@modules/mongo/mongo.database.async.actions";
import { MongoConnectionData } from "@apis/backend/generated";
import { IdConnection, MongoConnectionMeta } from "@modules/mongo/mongo.database.types";

interface AddMongoConnectionProps extends Pick<MongoConnectionMeta, "id" | "name"> {
	open: boolean;
	setClose: () => void;
}

export function DeleteMongoConnection({ open, setClose, name, id }: AddMongoConnectionProps) {
	const dispatch = useAppDispatch();

	const deleteCb = useCallback(() => {
		dispatch(manageMongoConnections.delete(id));
		setClose();
	}, [dispatch, id, setClose]);

	return (
		<Dialog open={open} onClose={setClose}>
			<DialogTitle>Delete a MongoDB connection</DialogTitle>
			<DialogContent dividers>
				<Stack direction={"row"} spacing={1}>
					<Typography whiteSpace={"nowrap"}>Are you sure that you want to delete</Typography>
					<Typography whiteSpace={"nowrap"} color="primary" fontWeight={"bold"}>
						{name}
					</Typography>
					<Typography whiteSpace={"nowrap"}>mongo connection?</Typography>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={3}>
					<Button color={"error"} variant={"contained"} onClick={deleteCb}>
						Yes
					</Button>
					<Button color={"inherit"} onClick={setClose}>
						Cancel
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
