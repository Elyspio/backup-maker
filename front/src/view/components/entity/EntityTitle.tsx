import React from "react";
import { Stack, Typography } from "@mui/material";

type EntitySubPropertyProps = {
	name: string;
	value: string;
};

export function EntityTitle({ name, value }: EntitySubPropertyProps) {
	return (
		<Stack direction={"row"} spacing={1} alignItems={"center"} justifyContent={"center"} width={"100%"} fontWeight={"bold"} pb={2}>
			<Typography fontSize={"100%"} variant={"overline"}>
				{name} :
			</Typography>
			<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
				{value}
			</Typography>
		</Stack>
	);
}
