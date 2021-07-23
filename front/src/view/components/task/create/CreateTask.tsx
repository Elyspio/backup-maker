import React, {useCallback} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../../../store";
import {createTask, setTaskCreationSchedule, setTaskCreationState} from "../../../../store/module/task/task.action";
import Interval from "../common/schedule/Interval";
import {CreateTaskWork} from "./CreateTaskWork";
import "./CreateTask.scss"
import { Button } from '../../utils/button/Button';

const CreateTask = () => {


	const [isFormValid, setformValid] = React.useState(false);

	const dispatch = useAppDispatch();
	const handleClose = React.useCallback(() => {
		dispatch(setTaskCreationState(false));
	}, [dispatch])


	const handleCreate = useCallback(() => {
		dispatch(createTask())
	}, [dispatch])

	const task = useAppSelector(s => s.task.creating);

	const onIntervalChange = React.useCallback((val: number) => {
		dispatch(setTaskCreationSchedule({interval: val}));
	}, [dispatch])


	return task ? <Dialog
			open={true}
			onClose={handleClose}
			aria-labelledby="create-task-dialog-title"
			aria-describedby="create-task-dialog-description"
		>
			<DialogTitle id="create-task-dialog-title">Create a new task</DialogTitle>
			<DialogContent className={"CreateTask"}>

				<Grid container direction={"column"} spacing={4}>
					<Grid item container direction={"column"}>
						<Grid item>
							<Typography color={"primary"} variant={"overline"}>Schedule</Typography>
						</Grid>
						<Grid item>
							<Interval value={task.schedule.interval} onChange={onIntervalChange}/>
						</Grid>
					</Grid>

					<CreateTaskWork
						onValidationStateChange={setformValid}
						data={task.work}
					/>

				</Grid>

			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleCreate} color="primary" autoFocus disabled={!isFormValid}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
		: null;

};

export default CreateTask;
