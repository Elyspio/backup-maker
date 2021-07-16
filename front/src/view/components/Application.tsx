import * as React from 'react';
import "./Application.scss"
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import TaskList from "./task/TaskList";
import {useAppDispatch, useAppSelector} from "../../store";
import {toggleTheme} from "../../store/module/theme/theme.action";
import {createDrawerAction, withDrawer} from "./utils/drawer/Drawer.hoc";
import {Box} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {setTaskCreationState} from "../../store/module/task/task.action";

function Application() {

	const dispatch = useAppDispatch();

	const {theme, icon: themeIcon} = useAppSelector(s => ({
		theme: s.theme.current,
		icon: s.theme.current === "dark" ? <Brightness5Icon/> : <Brightness3Icon/>
	}))

	const drawer = withDrawer({
		component: <TaskList/>,
		actions: [
			createDrawerAction(theme === "dark" ? "Light Mode" : "Dark Mode", {
				icon: themeIcon,
				onClick: () => dispatch(toggleTheme()),
			}),
			createDrawerAction("Add Task", {
				icon: <Add/>,
				onClick: () => dispatch(setTaskCreationState(true)),
			}),
		],
		title: "Tasks"
	})


	return (
		<Box className={"Application"} bgcolor={"background.default"}>
			{drawer}
		</Box>
	);
}


export default Application
