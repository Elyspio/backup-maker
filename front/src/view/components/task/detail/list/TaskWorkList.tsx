import {Grid, Typography} from "@material-ui/core";
import {SaveTypeEnum, Task, TaskOnTypeEnum} from "../../../../../core/apis/backend";
import React from "react";

import ConnectionInfo from "../../common/ssh/ConnectionInfo";
import TextHeader from "../../../utils/text-header/TextHeader";

type TaskProps = {
	data: Task["work"]
}


export function TaskWorkList({data}: TaskProps) {
	return (
		<>
			<Grid item container spacing={2} alignItems={"center"}>

				<Grid item className={"task-title"}>
					<Typography color={"textPrimary"} variant={"overline"}>Work</Typography>
				</Grid>

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
					data.on.type === TaskOnTypeEnum.Ssh && data.save.connectionInfo && <Grid item xs={6}>
						<ConnectionInfo data={data.save.connectionInfo} readonly/>
					</Grid>
				}

			</Grid>

			<Grid item container spacing={2} alignItems={"center"}>

				<Grid item className={"task-title"}>
					<Typography color={"textPrimary"} variant={"overline"}>Save</Typography>
				</Grid>


				<Grid item xs>
					<TextHeader header={"Save type"} text={data.save.type.toString()}/>
				</Grid>

				<Grid item xs>
					<TextHeader
						header={data.save.type === SaveTypeEnum.Ssh
							? "Remote path"
							: "Local path"
						}
						text={data.save.path}
					/>
				</Grid>


				{
					data.save.type === SaveTypeEnum.Ssh && data.save.connectionInfo && <Grid item>
						<ConnectionInfo data={data.save.connectionInfo} readonly
						/>
					</Grid>
				}

			</Grid>
		</>

	);
}
