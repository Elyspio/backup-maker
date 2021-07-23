import {AddTask, ConnectionInfo as IConnectionInfo, Save, SaveTypeEnum, TaskOn, TaskOnTypeEnum, TaskWorkListTypeEnum} from "../../../../core/apis/backend";
import React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {useAppDispatch} from "../../../../store";
import {setTaskCreationWork} from "../../../../store/module/task/task.action";
import ConnectionInfo from "../common/ssh/ConnectionInfo";


type CreateTaskWorkProps = {
	data: AddTask["work"],
	onValidationStateChange: (valid: boolean) => void
}

const defaultConnectionInfo: IConnectionInfo = {
	username: "",
	port: 22,
	host: "",
}

const isEmpty = (str?: string) => str?.length === 0 || !str;

const isConnectionInfoValid = (conf: IConnectionInfo) => !isEmpty(conf.host) && !isEmpty(conf.port.toString()) && !isEmpty(conf.username) && !(isEmpty(conf.password) && isEmpty(conf.privateKey))


export function CreateTaskWork({data, onValidationStateChange}: CreateTaskWorkProps) {
	const [type, setType] = React.useState(data.type);
	const [on, setOn] = React.useState(data.on);
	const [save, setSave] = React.useState(data.save);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(setTaskCreationWork({type, on, save}))
	}, [dispatch, type, on, save]);


	const changeSaveProperty = React.useCallback((field: keyof (Save), value: any) => {
		if (JSON.stringify(save[field]) !== JSON.stringify(value)) {
			const state: Save = {
				...save,
				[field]: value,
			}

			if (field === "type" && value === SaveTypeEnum.Ssh) state["connectionInfo"] = {...defaultConnectionInfo}
			if (field === "type" && value === SaveTypeEnum.Local) state["connectionInfo"] = undefined

			setSave(state)
		}

	}, [save])

	const changeOnProperty = React.useCallback((field: keyof (TaskOn), value: any) => {

		if (JSON.stringify(on[field]) !== JSON.stringify(value)) {
			const state: TaskOn = {
				...on,
				[field]: value,
			}

			if (field === "type" && value === TaskOnTypeEnum.Ssh) state["connectionInfo"] = {...defaultConnectionInfo}
			if (field === "type" && value === TaskOnTypeEnum.Local) state["connectionInfo"] = undefined

			setOn(state)
		}


	}, [on])

	// Handle form validation
	React.useEffect(() => {
		onValidationStateChange(!isEmpty(on.folder)
			&& !isEmpty(save.path)
			&& !isEmpty(on.folder)
			&& !(save.type === SaveTypeEnum.Ssh && !isConnectionInfoValid(save.connectionInfo!))
			&& !(on.type === TaskOnTypeEnum.Ssh && !isConnectionInfoValid(on.connectionInfo!))
		)
	}, [on, save, onValidationStateChange])


	return <>
		<Grid item xs>
			{/* Type */}
			<FormControl fullWidth>
				<InputLabel id="create-task-work-type-label">Work type</InputLabel>
				<Select
					labelId="create-task-work-type-label"
					id="create-task-work-type-select"
					value={type}
					onChange={(e) => setType(e.target.value as any)}
				>
					{Object.keys(TaskWorkListTypeEnum).map(key => <MenuItem key={key} value={TaskWorkListTypeEnum[key]}>{TaskWorkListTypeEnum[key]}</MenuItem>)}
				</Select>
			</FormControl>
		</Grid>


		<Grid item xs={12} container direction={"column"} spacing={1}>
			{/* On */}

			<Grid item>
				<Typography color={"primary"} variant={"overline"}>Work</Typography>
			</Grid>

			<Grid item>
				<FormControl fullWidth>
					<InputLabel id="create-task-work-on-label">Work on</InputLabel>
					<Select
						labelId="create-task-work-on-label"
						id="create-task-work-on-select"
						value={on.type}
						onChange={(e) => changeOnProperty("type", e.target.value)}
					>
						{Object.keys(TaskOnTypeEnum).map(key => <MenuItem key={key} value={TaskOnTypeEnum[key]}>{TaskOnTypeEnum[key]}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>


			<Grid item>
				<TextField
					fullWidth
					defaultValue={on.folder}
					error={isEmpty(on.folder)}
					label={on.type === TaskOnTypeEnum.Ssh ? "Remote folder" : "Local folder"}
					onChange={e => changeOnProperty("folder", e.target.value)}
				/>
			</Grid>
			{
				on.type === TaskOnTypeEnum.Ssh && on.connectionInfo && <Grid item>
					<ConnectionInfo
						data={on.connectionInfo}
						onChange={e => changeOnProperty("connectionInfo", e)}
					/>
				</Grid>
			}

		</Grid>

		<Grid item xs={12} container direction={"column"} spacing={1}>
			{/* Save */}

			<Grid item>
				<Typography color={"primary"} variant={"overline"}>Save</Typography>
			</Grid>

			<Grid item>
				<FormControl fullWidth>
					<InputLabel id="create-task-work-save-label">Save to</InputLabel>
					<Select
						labelId="create-task-work-save-label"
						id="create-task-work-save-select"
						value={save.type}
						onChange={(e) => changeSaveProperty("type", e.target.value)}
					>
						{Object.keys(SaveTypeEnum).map(key => <MenuItem key={key} value={SaveTypeEnum[key]}>{SaveTypeEnum[key]}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>


			<Grid item>
				<TextField
					fullWidth
					defaultValue={save.path}
					error={isEmpty(save.path)}
					label={save.type === SaveTypeEnum.Ssh ? "Remote path" : "Local path"}
					onChange={e => changeSaveProperty("path", e.target.value)}
				/>
			</Grid>

			{
				save.type === SaveTypeEnum.Ssh && save.connectionInfo && <Grid item>
					<ConnectionInfo data={save.connectionInfo} onChange={e => changeSaveProperty("connectionInfo", e)}/>
				</Grid>
			}


		</Grid>

	</>;
}
