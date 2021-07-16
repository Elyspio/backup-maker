import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import TextHeader from "../../../utils/text-header/TextHeader";


type IntervalProps = {
	value: number,
	onChange?: (value: number) => void
	readonly?: boolean
};

const getKey = (x: Record<string, number>, val: any) => {
	return Object.keys(x).find(key => x[key] === val)
}

function Interval(props: IntervalProps) {

	const [val, setVal] = useState<number>(props.value);

	const unitsVals = React.useMemo(() => ({
		second: 1000,
		minute: 1000 * 60,
		hour: 1000 * 60 * 60,
		day: 1000 * 60 * 24,
		month: 1000 * 60 * 24 * 30,
	}), [])

	const handleChange = React.useCallback((e: any) => {
		if (!props.readonly) {
			let v = Number.parseInt(e.target.value.toString());
			setVal(v)
			props.onChange && props.onChange(v)
		}
	}, [setVal, props])


	return (
		props.readonly
			? <TextHeader header="Repeat after" text={getKey(unitsVals, val) ?? ""}/>
			: <FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Repeat every</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={val}
					onChange={handleChange}
					disabled={props.readonly}
				>
					<MenuItem value={unitsVals.second}>second</MenuItem>
					<MenuItem value={unitsVals.minute}>minute</MenuItem>
					<MenuItem value={unitsVals.hour}>hour</MenuItem>
					<MenuItem value={unitsVals.day}>day</MenuItem>
					<MenuItem value={unitsVals.month}>month</MenuItem>
				</Select>
			</FormControl>
	);
}

export default Interval;
