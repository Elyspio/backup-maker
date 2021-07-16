import React, {useMemo} from 'react';
import {Task} from "../../../../../core/apis/backend";
import {Grid, Typography} from "@material-ui/core";
import Interval from "./Interval";
import TextHeader from "../../../utils/text-header/TextHeader";

const dayjs = require("dayjs")
const duration = require('dayjs/plugin/duration')
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(duration)
dayjs.extend(relativeTime)

type ScheduleProps = {
	data: Task["schedule"]
}

function Schedule({data: {state, lastRun, interval}}: ScheduleProps) {

	const {lastRunStr, nextRunStr} = useMemo(() => {

		const nextRun = dayjs().add(interval, "millisecond");

		return {
			lastRunStr: dayjs(lastRun).from(dayjs(), true),
			nextRunStr: nextRun.from(dayjs(), true)
		}
	}, [lastRun])

	return (
		<Grid container spacing={4} alignItems={"center"}>

			<Grid item>
				<Typography color={"textPrimary"} className={"task-title"} variant={"overline"}>Schedule</Typography>
			</Grid>

			<Grid item>
				<Interval value={interval} readonly/>
			</Grid>

			<Grid item>
				<TextHeader header={"State"} text={state}/>
			</Grid>

			<Grid item>
				<TextHeader header={"Last run"} text={lastRunStr ?? "Never"}/>
			</Grid>


			<Grid item>
				<TextHeader header={"Next run"} text={nextRunStr ?? "Never"}/>
			</Grid>
		</Grid>
	);
}

export default Schedule;
