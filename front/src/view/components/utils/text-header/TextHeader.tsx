import React from 'react';
import {Box, Typography} from "@material-ui/core";
import "./TextHeader.scss"

type TextHeaderProps = {
	header: string,
	text: string,
	title?: string
}

function TextHeader({header, text, title}: TextHeaderProps) {
	return (
		<Box className={"TextHeader"}>
			<Typography className={"heading"} color={"textPrimary"}>{header}</Typography>
			<Typography color={"textPrimary"} title={title}>{text}</Typography>
		</Box>
	);
}

export default TextHeader;
