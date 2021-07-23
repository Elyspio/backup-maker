import {Button as MuiButton, ButtonProps} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import {useAppSelector} from "../../../../store";
import {themes} from "../../../../config/theme";

type NewColors = "error" | "warning";

interface Props extends Omit<ButtonProps, "color"> {
	color: ButtonProps["color"] | NewColors;
}

export function Button(props: Props) {
	const theme = useAppSelector(store => themes[store.theme.current]);
	const t = {...theme};

	const newColors = ["error", "warning"];

	const muiButton = <MuiButton {...props} color={props.color as ButtonProps["color"]}/>;

	if (props.color === undefined || props.color === "inherit" || props.color === "default") {
		return muiButton;
	}

	if (newColors.includes(props.color)) {
		t.palette = {
			...theme.palette,
			primary: theme.palette[props.color]
		};
	}

	return newColors.includes(props.color) ? (
		<ThemeProvider theme={t}>
			<MuiButton {...props} color={"primary"}/>
		</ThemeProvider>
	) : muiButton;
}
