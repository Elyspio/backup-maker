import React from 'react';
import {ScheduleStateEnum, Task as ITask} from "../../../../core/apis/backend";
import {Box, IconButton, Paper} from "@material-ui/core";
import {TaskWorkListOn, TaskWorkListSave} from "./list/TaskWorkList";
import Schedule from "../common/schedule/Schedule";
import "./Task.scss"
import {Close, PlayArrow, Stop} from "@material-ui/icons";
import {green, grey, red} from "@material-ui/core/colors";
import {useAppDispatch} from "../../../../store";
import {removeTask, startTask, stopTask} from "../../../../store/module/task/task.action";
import {TabContainer, TabContainerProps} from "../../utils/tabs/TabPanel";

type TaskProps = {
	data: ITask
}

function Task({data: {work, id, schedule}}: TaskProps) {

	const dispatch = useAppDispatch();

	const colors = {
		play: schedule.state !== ScheduleStateEnum.Stopped ? grey[500] : green[500],
		stop: schedule.state === ScheduleStateEnum.Stopped ? grey[500] : red[500],
		close: grey[900],
	}

	const tabs: TabContainerProps["items"] = [
		{
			label: "Schedule",
			component: <Schedule data={schedule}/>
		},
		{
			label: "Work",
			component: <TaskWorkListOn data={work}/>
		},
		{
			label: "Save",
			component: <TaskWorkListSave data={work}/>
		}
	]

	return (
		<Paper className={"Task"} elevation={2}>
			<TabContainer items={tabs}/>
			<Box className={"task-actions"}>

				{
					schedule.state === ScheduleStateEnum.Stopped
						? <IconButton onClick={() => dispatch(startTask(id))}>
							<PlayArrow style={{color: colors.play}}/>
						</IconButton>
						: <IconButton onClick={() => dispatch(stopTask(id))}>
							<Stop style={{color: colors.stop}}/>
						</IconButton>
				}


				<IconButton
					onClick={() => dispatch(removeTask(id))}>
					<Close style={{color: colors.close}}/>
				</IconButton>
			</Box>
		</Paper>
	);
}

export default Task;
