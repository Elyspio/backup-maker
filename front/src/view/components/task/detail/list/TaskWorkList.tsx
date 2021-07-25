import {Grid, Typography} from "@material-ui/core";
import {SaveTypeEnum, Task, TaskOnTypeEnum} from "../../../../../core/apis/backend";
import React from "react";

import ConnectionInfo from "../../common/ssh/ConnectionInfo";
import TextHeader from "../../../utils/text-header/TextHeader";

type TaskProps = {
	data: Task["work"]
}

export function TaskWorkListOn({data}: TaskProps) {
	return <Grid item container spacing={4} alignItems={"center"}>

		<Grid item xs>
			<TextHeader header={"Work type"} text={data.on.type.toString()}/>
		</Grid>

		<Grid item xs>
			<TextHeader
				header={data.on.type === TaskOnTypeEnum.Ssh
					? "Remote folder"
					: "Local folder"
				}
				text={data.on.folder}
			/>
		</Grid>
		{
			data.on.type === TaskOnTypeEnum.Ssh && data.on.connectionInfo && <Grid item xs={6}>
				<ConnectionInfo data={data.on.connectionInfo} readonly/>
			</Grid>
		}

	</Grid>
}

export function TaskWorkListSave({data}: TaskProps) {
	return <Grid item container spacing={2} >

		<Grid item xs={6}>
			<TextHeader header={"Save type"} text={data.save.type.toString()}/>
		</Grid>

		<Grid item xs={6}>
			<TextHeader
				header={data.save.type === SaveTypeEnum.Ssh
					? "Remote path"
					: "Local path"
				}
				text={data.save.path}
			/>
		</Grid>


		{
			data.save.type === SaveTypeEnum.Ssh && data.save.connectionInfo && <Grid item xs={12}>
				<ConnectionInfo data={data.save.connectionInfo} readonly/>
			</Grid>
		}

	</Grid>
}
