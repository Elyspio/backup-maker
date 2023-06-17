import { MongoBackupTaskData, MongoConnectionData } from "@apis/backend/generated";
import React, { useMemo } from "react";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import { Stack, Typography } from "@mui/material";

type MongoTaskDetailProps = {
	task: MongoBackupTaskData;
	connection: MongoConnectionData;
};

export function MongoTaskDetail({ task, connection }: MongoTaskDetailProps) {
	const maxDatabaseNameLength = useMemo(() => {
		const databaseNames = Object.keys(task.elements);
		return databaseNames.reduce((acc, curr) => (curr.length > acc ? curr.length : acc), databaseNames[0].length);
	}, [task.elements]);

	const elements = useMemo(
		() =>
			Object.entries(deepClone(task.elements) as MongoBackupTaskData["elements"])
				.sort(([databaseA], [databaseB]) => databaseA.localeCompare(databaseB))
				.map(([database, collections]) => (
					<Stack key={database} direction={"row"} flexWrap={"wrap"} alignItems={"center"} spacing={2}>
						<Typography color={"secondary"} variant={"overline"} fontSize={"95%"} minWidth={(maxDatabaseNameLength + 3) * 10}>
							{database} :
						</Typography>
						<Stack direction={"row"} spacing={2} flexWrap={"wrap"}>
							{collections.sort().map((col) => (
								<Typography key={col} fontFamily={"consolas"} sx={{ opacity: 0.85 }}>
									{col}
								</Typography>
							))}
						</Stack>
					</Stack>
				)),
		[task.elements, maxDatabaseNameLength]
	);

	return (
		<Stack spacing={1}>
			<Stack alignItems={"center"} my={2} spacing={1} direction={"row"}>
				<Typography fontSize={"95%"} variant={"overline"}>
					Connection :
				</Typography>
				<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
					{connection.name}
				</Typography>
			</Stack>

			<Stack>{elements}</Stack>
		</Stack>
	);
}
