import {Box, Container, Grid} from "@material-ui/core";
import * as React from 'react';
import {useAppSelector} from "../../../store";
import Task from "./detail/Task";
import CreateTask from "./create/CreateTask";


const TaskList = () => {

	const conf = useAppSelector(s => s.task.config);
	return (
		<Box className={"TaskList"}>
			<Container>
				<Grid container direction={"column"} spacing={4}>
					{conf.tasks.map(task => <Grid item key={task.id}>
						<Task data={task}/>
					</Grid>)}
				</Grid>
			</Container>

			<CreateTask/>

		</Box>
	);

}


export default TaskList;
