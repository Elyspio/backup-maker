import React, { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { manageMongoConnections } from "@modules/mongo/mongo.database.async.actions";
import { MongoConnectionData } from "@apis/backend/generated";

interface AddMongoConnectionProps {
	open: boolean;
	setClose: () => void;
}

export function DeleteMongoConnection({ open, setClose }: AddMongoConnectionProps) {
	const dispatch = useAppDispatch();

	const { id, name } = useAppSelector((s) => s.router.location?.state as MongoConnectionData);

	const deleteCb = useCallback(() => {
		dispatch(manageMongoConnections.delete(id));
		setClose();
	}, [dispatch, id, setClose]);

	return (
		<Dialog open={open} onClose={setClose}>
			<DialogTitle>Create a mongodb connection</DialogTitle>
			<DialogContent dividers>
				<Stack direction={"row"} spacing={2}>
					<Typography whiteSpace={"nowrap"}>Are you sure that you want to delete</Typography>
					<Typography whiteSpace={"nowrap"} color="primary" variant={"overline"}>
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
					<Button color={"inherit"} variant={"outlined"} onClick={setClose}>
						No
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
