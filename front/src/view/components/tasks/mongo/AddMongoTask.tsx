import React, { useCallback, useEffect, useMemo } from "react";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { IdConnection, MongoConnectionMeta } from "@modules/databases/mongo/mongo.database.types";
import { usePropsState } from "@hooks/usePropsState";
import { DatabaseInfo, MongoBackupTaskBase } from "@apis/backend/generated";
import { manageMongoTasks } from "@modules/tasks/tasks.async.actions";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import { MongoBackupElements } from "@components/tasks/mongo/MongoBackupElements";
import { AddEntityProps } from "@components/entity/EntityManager";

const emptyObject = {};

export function AddMongoTask({ open, setClose, update }: AddEntityProps<IdConnection>) {
	const { previousValue, connections } = useAppSelector((s) => ({
		connections: s.databases.mongo.connections,
		previousValue: s.tasks.mongo[update!],
	}));

	const dispatch = useAppDispatch();

	const [name, setName] = usePropsState(previousValue?.name ?? "");
	const [idConnection, setIdConnection] = usePropsState<string | undefined>(previousValue?.idConnection);
	const [elements, setElements] = usePropsState<MongoBackupTaskBase["elements"]>(previousValue?.elements ?? emptyObject);

	const updateName = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setName(e.target.value);
		},
		[setName]
	);

	const updateConnection = useCallback(
		(_: React.SyntheticEvent, connection: MongoConnectionMeta | null) => {
			setIdConnection(connection?.id);
		},
		[setIdConnection]
	);

	const createNewMongoTask = useCallback(() => {
		if (!idConnection) return;
		const action = !update
			? manageMongoTasks.add({
					name,
					idConnection,
					elements,
			  })
			: manageMongoTasks.update({
					name,
					idConnection,
					elements,
					id: update,
			  });

		dispatch(action);
		setClose();
	}, [update, name, idConnection, elements, dispatch, setClose]);

	const connectionsOptions = useMemo(() => Object.values(connections), [connections]);

	useEffect(() => {
		if (!update) setElements({});
	}, [idConnection, setElements, update]);

	const onCollectionSelected = useCallback(
		(database: DatabaseInfo["name"], collection: string, state: boolean) => {
			setElements((elems) => {
				const newElems = deepClone(elems) as typeof elems;
				newElems[database] ??= [];
				if (state) newElems[database].push(collection);
				else newElems[database] = newElems[database].filter((col) => col !== collection);
				if (newElems[database].length === 0) delete newElems[database];
				return newElems;
			});
		},
		[setElements]
	);

	return (
		<Dialog open={open} onClose={setClose} maxWidth={"md"} fullWidth>
			<DialogTitle align={"center"}>{update ? "Update" : "Create"} a mongo backup task</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3} p={3}>
					<TextField onChange={updateName} disabled={!!update} value={name} label={"Name"} />
					<Autocomplete
						value={connections[idConnection!] ?? null}
						onChange={updateConnection}
						getOptionLabel={(option) => option.name}
						renderInput={(params) => <TextField {...params} label="Mongo connection" />}
						options={connectionsOptions}
					/>
					{idConnection && <MongoBackupElements idConnection={idConnection} elements={elements} onChange={onCollectionSelected} />}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={3}>
					<Button color={"primary"} variant={"outlined"} onClick={createNewMongoTask} disabled={!name || !idConnection || Object.values(elements).length === 0}>
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
