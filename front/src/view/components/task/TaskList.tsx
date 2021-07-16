import {Box, Container, Grid} from "@material-ui/core";
import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../../store";
import {getConfig} from "../../../store/module/task/task.action";
import Task from "./detail/Task";
import CreateTask from "./create/CreateTask";


const TaskList = () => {

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(getConfig());
	}, [dispatch]);

	const conf = useAppSelector(s => s.task.config);
	return (
		<Box className={"TaskList"}>
			<Container>
				<Grid container direction={"column"} spacing={4}>
					{conf.tasks.map(task => <Grid item>
						<Task data={task}/>
					</Grid>)}
				</Grid>
			</Container>

			<CreateTask/>

		</Box>
	);

}


export default TaskList;
