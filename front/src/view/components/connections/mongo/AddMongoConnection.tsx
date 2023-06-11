import React, { useCallback, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

interface AddMongoConnectionProps {
	open: boolean;
	setClose: () => void;
}

export function AddMongoConnection({ open, setClose }: AddMongoConnectionProps) {
	const [name, setName] = useState("");
	const [connectionString, setConnectionString] = useState("");

	const updateField = useCallback(
		(field: "name" | "connectionString") => (e: React.ChangeEvent<HTMLInputElement>) => {
			const fn = field === "connectionString" ? setConnectionString : setName;
			fn(e.target.value);
		},
		[]
	);

	return (
		<Dialog open={open} onClose={setClose} maxWidth={"md"} fullWidth>
			<DialogTitle>Create a mongodb connection</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3} p={3}>
					<TextField onChange={updateField("name")} value={name} label={"Name"} />
					<TextField onChange={updateField("connectionString")} value={connectionString} label={"Connection String"} />
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={3}>
					<Button color={"primary"} variant={"outlined"}>
						Add
					</Button>
					<Button color={"inherit"} variant={"outlined"}>
						Cancel
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
