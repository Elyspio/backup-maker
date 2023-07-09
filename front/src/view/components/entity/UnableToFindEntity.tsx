import React from "react";
import { Stack, Typography } from "@mui/material";

type UnableToFindEntityProps = {
	description: string;
	name: string;
};

export function UnableToFindEntity({ name, description }: UnableToFindEntityProps) {
	return (
		<Stack alignItems={"center"} direction={"row"} spacing={1} justifyContent={"center"} height={"100%"} width={"100%"}>
			<Typography fontSize={"150%"}>Unable to find the {description} </Typography>
			<Typography fontSize={"160%"} component={"span"} color={"error"}>
				{name}
			</Typography>
		</Stack>
	);
}
