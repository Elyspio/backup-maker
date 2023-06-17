import React, { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "@store";
import { AnyAction } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";

interface AddMongoConnectionProps {
	open: boolean;
	setClose: () => void;
	entity: {
		name: string;
		id: string;
	};
	title: string;
	description: string;
	deleteFn: (id: string) => AnyAction | ThunkAction<any, any, any, any>;
}

export function DeleteEntity({ title, open, setClose, description, entity: { id, name }, deleteFn }: AddMongoConnectionProps) {
	const dispatch = useAppDispatch();

	const deleteCb = useCallback(() => {
		dispatch(deleteFn(id));
		setClose();
	}, [deleteFn, dispatch, id, setClose]);

	return (
		<Dialog open={open} onClose={setClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>
				<Stack direction={"row"} spacing={1}>
					<Typography whiteSpace={"nowrap"}>Are you sure that you want to delete</Typography>
					<Typography whiteSpace={"nowrap"} color="primary" fontWeight={"bold"}>
						{name}
					</Typography>
					<Typography whiteSpace={"nowrap"}>{description}</Typography>
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
