import React from "react";
import { Box, Stack, Typography } from "@mui/material";

type EntitySubPropertyProps = {
	name: string;
	value: string | string[];
};

export function EntitySubProperty({ name, value }: EntitySubPropertyProps) {
	let node = (
		<Typography variant={"body2"} sx={{ opacity: 0.75 }}>
			{value}
		</Typography>
	);
	if (Array.isArray(value)) {
		node = (
			<Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
				{value.map((v) => (
					<Typography sx={{ opacity: 0.75 }} key={v}>
						{v}
					</Typography>
				))}
			</Stack>
		);
	}

	return (
		<Stack direction={"row"} spacing={2} alignItems={"center"}>
			<Box>
				<Typography fontWeight={"bold"} fontSize={"80%"} variant={"overline"} noWrap>
					{name} :
				</Typography>
			</Box>
			{node}
		</Stack>
	);
}
