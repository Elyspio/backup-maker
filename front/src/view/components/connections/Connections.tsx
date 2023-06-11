import React, { useCallback } from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { AppAccordion } from "@components/utils/accordion/AppAccordion";
import { MongoConnections } from "@components/connections/mongo/MongoConnections";
import { Add } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { AddMongoConnection } from "@components/connections/mongo/AddMongoConnection";

export function Connections() {
	const modal = useModal(false);

	const addMongoConnection = useCallback(
		(e: React.MouseEvent) => {
			modal.setOpen();
			e.stopPropagation();
		},
		[modal]
	);

	return (
		<Stack spacing={2} height={"100%"}>
			<Typography variant={"overline"} fontSize={"110%"} whiteSpace={"nowrap"}>
				Database Connections
			</Typography>
			<AppAccordion.Frame>
				<AppAccordion.Summary>
					<Stack direction={"row"} justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
						<Typography>Mongo</Typography>
						<Tooltip title={"Add a new mongo connection"}>
							<IconButton onClick={addMongoConnection} color={"success"}>
								<Add />
							</IconButton>
						</Tooltip>
					</Stack>
				</AppAccordion.Summary>
				<AppAccordion.Details>
					<MongoConnections />
				</AppAccordion.Details>
			</AppAccordion.Frame>
			<AddMongoConnection open={modal.open} setClose={modal.setClose} />
		</Stack>
	);
}
