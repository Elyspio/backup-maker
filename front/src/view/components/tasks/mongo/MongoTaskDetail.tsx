import { MongoBackupTaskData, MongoConnectionData } from "@apis/backend/generated";
import React, { useMemo } from "react";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import { Stack } from "@mui/material";
import { EntitySubProperty } from "@components/entity/EntitySubProperty";

type MongoTaskDetailProps = {
	task: MongoBackupTaskData;
	connection: MongoConnectionData;
};

export function MongoTaskDetail({ task, connection }: MongoTaskDetailProps) {
	const elements = useMemo(
		() =>
			Object.entries(deepClone(task.elements) as MongoBackupTaskData["elements"])
				.sort(([databaseA], [databaseB]) => databaseA.localeCompare(databaseB))
				.map(([database, collections]) => <EntitySubProperty key={database} name={database} value={collections.sort()} />),
		[task.elements]
	);

	return (
		<Stack spacing={1}>
			<EntitySubProperty name={"Connection"} value={connection.name} />
			<Stack>{elements}</Stack>
		</Stack>
	);
}
