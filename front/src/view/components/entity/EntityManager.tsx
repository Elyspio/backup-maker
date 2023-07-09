import { useModal } from "@hooks/useModal";
import React, { useCallback } from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { AppAccordion } from "@components/utils/accordion/AppAccordion";
import { Add } from "@mui/icons-material";
import { AddEntityProps } from "@components/connections/mongo/AddMongoConnection";

type EntityManagerProps<T> = {
	AddComponent: (props: AddEntityProps<T>) => React.JSX.Element;
	name: string;
	title: string;
	elements: React.JSX.Element;
};

export function EntityManager<T>({ name, elements, AddComponent, title }: EntityManagerProps<T>) {
	const modal = useModal(false);

	const addEntity = useCallback(
		(e: React.MouseEvent) => {
			modal.setOpen();
			e.stopPropagation();
		},
		[modal]
	);

	return (
		<Stack spacing={2}>
			<AppAccordion.Frame>
				<AppAccordion.Summary>
					<Stack direction={"row"} justifyContent={"space-between"} width={150} alignItems={"center"}>
						<Typography>{name}</Typography>
						<Tooltip title={title} placement={"right"}>
							<IconButton onClick={addEntity} color={"success"}>
								<Add />
							</IconButton>
						</Tooltip>
					</Stack>
				</AppAccordion.Summary>
				<AppAccordion.Details>{elements}</AppAccordion.Details>
			</AppAccordion.Frame>
			<AddComponent open={modal.open} setClose={modal.setClose} />
		</Stack>
	);
}
