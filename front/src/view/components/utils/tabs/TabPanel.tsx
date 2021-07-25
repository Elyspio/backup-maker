import {AppBar, Box, Tab, Tabs} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

type TabPanelProps = { children: React.ReactChild, index: number, value: number };

export function TabPanel(props: TabPanelProps) {
	const {children, value, index, ...other} = props;

	return (
		<div
			className={"TabPanel"}
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					{children}
				</Box>
			)}
		</div>
	);
}

export type TabContainerProps = {
	items: {
		component: React.ReactChild,
		label: string
	}[]
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

export function TabContainer(props: TabContainerProps) {

	const classes = useStyles();

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		event.preventDefault();
		event.stopPropagation();
		setValue(newValue);
	};
	return <div className={"TabContainer " + classes.root}>
		<AppBar position={"static"} color={"default"}>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="fullWidth"
				indicatorColor="secondary"
				textColor="secondary"
				aria-label="icon label tabs example"
			>
				{props.items.map(item => <Tab key={item.label} label={item.label}/>)}
			</Tabs>
		</AppBar>
		{props.items.map((item, i) => <TabPanel
			value={value}
			key={item.label}
			index={i}
			children={item.component}
		/>)}
	</div>
}
