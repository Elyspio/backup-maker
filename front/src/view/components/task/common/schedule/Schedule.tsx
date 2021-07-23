import React, {useMemo, useState} from 'react';
import {ScheduleStateEnum, Task} from "../../../../../core/apis/backend";
import {Grid, Typography} from "@material-ui/core";
import Interval from "./Interval";
import TextHeader from "../../../utils/text-header/TextHeader";
import {formatDuration} from "../../../../util/date";

const dayjs = require("dayjs")
const duration = require('dayjs/plugin/duration')
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(duration)
dayjs.extend(relativeTime)

type ScheduleProps = {
	data: Task["schedule"]
}

function Schedule({data: {state, lastRun, interval}}: ScheduleProps) {


	const [now, setNow] = useState(dayjs());

	React.useEffect(() => {
		const interval = setInterval(() => setNow(dayjs()), 500);
		return () => clearInterval(interval);
	}, [])

	const {lastRunStr, nextRunStr} = useMemo(() => {

		const nbSeconds = now.diff(dayjs(lastRun).add(interval, "milliseconds"), "seconds");

		return {
			lastRunStr: formatDuration(dayjs.duration(now.diff(lastRun), "milliseconds")),
			nextRunStr: state === ScheduleStateEnum.Waiting ? formatDuration(dayjs.duration(nbSeconds, "seconds")) : "Never"
		}
	}, [lastRun, interval, now, state])

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
