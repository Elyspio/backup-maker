import React, { SetStateAction, useCallback } from "react";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { usePropsState } from "@hooks/usePropsState";
import { manageFtpDeploy } from "@modules/deploys/deploys.async.actions";
import { FtpConnection, FtpDeployBase, FtpEncryption } from "@apis/backend/generated";
import { AddEntityProps } from "@components/entity/EntityManager";

type ManagedProps = keyof Omit<FtpConnection, "encryption"> | keyof Omit<FtpDeployBase, "connection">;

export function AddFtpDeploy({ open, setClose, update }: AddEntityProps<IdConnection>) {
	const previousValue = useAppSelector((s) => s.deploys.ftp[update!]);

	const dispatch = useAppDispatch();

	const [name, setName] = usePropsState(previousValue?.name ?? "");

	const [outputPath, setOutputPath] = usePropsState(previousValue?.outputPath ?? "");

	const [host, setHost] = usePropsState(previousValue?.connection.host ?? "");
	const [username, setUsername] = usePropsState(previousValue?.connection.username ?? "");
	const [password, setPassword] = usePropsState(previousValue?.connection.password ?? "");
	const [port, setPort] = usePropsState(previousValue?.connection.port ?? 21);
	const [encryption, setEncryption] = usePropsState(previousValue?.connection.encryption ?? FtpEncryption.None);

	const updateTextField = useCallback(
		<T extends ManagedProps>(field: T) =>
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const setters: Record<ManagedProps, React.Dispatch<SetStateAction<any>>> = {
					port: setPort,
					name: setName,
					outputPath: setOutputPath,
					host: setHost,
					username: setUsername,
					password: setPassword,
				};
				setters[field](e.target.value);
			},
		[setHost, setName, setOutputPath, setPassword, setPort, setUsername]
	);

	const updateAutocomplete = useCallback(
		(_: React.SyntheticEvent, value: FtpEncryption | null) => {
			setEncryption(value ?? FtpEncryption.None);
		},
		[setEncryption]
	);

	const createOrUpdateLocalDeploy = useCallback(() => {
		const action = !update
			? manageFtpDeploy.add({
					name,
					outputPath,
					connection: {
						port,
						encryption,
						password,
						host,
						username,
					},
			  })
			: manageFtpDeploy.update({
					id: update,
					name,
					outputPath,
					connection: {
						port,
						encryption,
						password,
						host,
						username,
					},
			  });

		dispatch(action as AsyncThunkAction<any, any, any>);
		setClose();
	}, [update, name, outputPath, port, encryption, password, host, username, dispatch, setClose]);

	return (
		<Dialog open={open} onClose={setClose} maxWidth={"md"} fullWidth>
			<DialogTitle align={"center"}>{update ? "Update" : "Create"} a FTP deployment configuration</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3} p={3}>
					<TextField onChange={updateTextField("name")} disabled={!!update} value={name} label={"Deployment's Name"} />
					<TextField onChange={updateTextField("outputPath")} value={outputPath} label={"Output Path"} />
					<Stack direction={"row"} spacing={2}>
						<TextField onChange={updateTextField("host")} disabled={!!update} value={host} label={"Server Host"} fullWidth />
						<TextField onChange={updateTextField("port")} disabled={!!update} value={port} label={"Server Port"} type={"number"} />
					</Stack>
					<Stack direction={"row"} spacing={2}>
						<TextField onChange={updateTextField("username")} disabled={!!update} value={username} label={"Server Username"} fullWidth />
						<TextField onChange={updateTextField("password")} disabled={!!update} value={password} label={"Server Password"} type={"password"} fullWidth />
					</Stack>

					<Autocomplete
						fullWidth
						value={encryption}
						onChange={updateAutocomplete}
						disabled={!!update}
						renderInput={(params) => <TextField {...params} label="Server Encryption" />}
						options={Object.keys(FtpEncryption) as FtpEncryption[]}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={3}>
					<Button color={"primary"} variant={"outlined"} onClick={createOrUpdateLocalDeploy}>
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
