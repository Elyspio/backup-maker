import React from 'react';
import {ScheduleStateEnum, Task as ITask, TaskWorkListTypeEnum} from "../../../../core/apis/backend";
import {Box, Grid, IconButton, Paper} from "@material-ui/core";
import {TaskWorkList} from "./list/TaskWorkList";
import Schedule from "../common/schedule/Schedule";
import "./Task.scss"
import {PlayArrow, Stop} from "@material-ui/icons";
import {green, grey, red} from "@material-ui/core/colors";
import {useAppDispatch} from "../../../../store";
import {startTask, stopTask} from "../../../../store/module/task/task.action";

type TaskProps = {
	data: ITask
}

function Task({data: {work, id, schedule}}: TaskProps) {

	const dispatch = useAppDispatch();

	const colors = {
		play: schedule.state !== ScheduleStateEnum.Stopped ? grey[500] : green[500],
		stop: schedule.state === ScheduleStateEnum.Stopped ? grey[500] : red[500],
	}

	return (
		<Paper className={"Task"} elevation={2}>
			<Grid container direction={"column"} spacing={4}>
				{work.type === TaskWorkListTypeEnum.List && <TaskWorkList data={work}/>}
				<Grid item>
					<Schedule data={schedule}/>
				</Grid>
			</Grid>

			<Box className={"task-actions"}>
				<IconButton
					onClick={() => dispatch(startTask(id))}
					disabled={schedule.state !== ScheduleStateEnum.Stopped}>
					<PlayArrow style={{color: colors.play}}/>
				</IconButton>
				<IconButton
					onClick={() => dispatch(stopTask(id))}
					disabled={schedule.state === ScheduleStateEnum.Stopped}>
					<Stop style={{color: colors.stop}}/>
				</IconButton>
			</Box>


		</Paper>
	);
}

export default Task;
