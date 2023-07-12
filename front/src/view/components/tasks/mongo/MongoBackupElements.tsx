import { useAppSelector } from "@store";
import React, { useCallback, useMemo } from "react";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { DatabaseInfo, MongoBackupTaskBase } from "@apis/backend/generated";

type MongoBackupElementsProps = {
	idConnection: IdConnection;
	elements: MongoBackupTaskBase["elements"];
	onChange: (database: DatabaseInfo["name"], collection: string, state: boolean) => void;
};

export function MongoBackupElements({ elements, idConnection, onChange }: MongoBackupElementsProps) {
	const { details } = useAppSelector((s) => ({
		details: s.databases.mongo.details[idConnection],
	}));

	const onCollectionSelected = useCallback(
		(database: string, collection: string, wasChecked: boolean) => () => {
			onChange(database, collection, !wasChecked);
		},
		[onChange]
	);

	const onDatabaseSelected = useCallback(
		(database: string) => () => {
			const collections = details[database].collections;

			const nextState = !elements[database]?.length;

			for (const collection of collections) {
				onChange(database, collection.name, nextState);
			}
		},
		[details, elements, onChange]
	);

	const elems = useMemo(
		() =>
			[...Object.values(details)]
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((info) => (
					<Stack key={info.name} height={"100%"} pt={0.5}>
						<Typography
							variant={"overline"}
							color={"primary"}
							textAlign={"center"}
							fontSize={"100%"}
							onClick={onDatabaseSelected(info.name)}
							sx={{ cursor: "pointer" }}
						>
							{info.name}
						</Typography>
						<Stack pl={2}>
							{info.collections.map((col) => {
								const checked = elements[info.name]?.includes(col.name) ?? false;
								return (
									<FormControlLabel
										key={col.name}
										onClick={onCollectionSelected(info.name, col.name, checked)}
										control={<Checkbox checked={checked} />}
										label={col.name}
									/>
								);
							})}
						</Stack>
					</Stack>
				)),
		[details, onCollectionSelected, onDatabaseSelected, elements]
	);

	return (
		<Stack flexWrap={"wrap"} direction={"row"} spacing={3} justifyContent={"space-evenly"}>
			{elems}
		</Stack>
	);
}
