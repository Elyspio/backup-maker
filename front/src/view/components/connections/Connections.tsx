import React from "react";
import { Stack, Typography } from "@mui/material";
import { AppAccordion } from "@components/utils/accordion/AppAccordion";
import { MongoConnections } from "@components/connections/mongo/MongoConnections";

export function Connections() {
	return (
		<Stack spacing={2} height={"100%"}>
			<Typography variant={"overline"} fontSize={"110%"} whiteSpace={"nowrap"}>
				Database Connections
			</Typography>
			<AppAccordion.Frame>
				<AppAccordion.Summary>Mongo</AppAccordion.Summary>
				<AppAccordion.Details>
					<MongoConnections />
				</AppAccordion.Details>
			</AppAccordion.Frame>
		</Stack>
	);
}
