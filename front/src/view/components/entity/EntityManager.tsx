import { useModal } from "@hooks/useModal";
import React, { useCallback } from "react";
import { Stack, Typography } from "@mui/material";
import { AppAccordion } from "@components/utils/accordion/AppAccordion";
import { Add } from "@mui/icons-material";
import { IconWithTooltip } from "@components/utils/tooltip/IconWithTooltip";
import { usePermissions } from "@hooks/usePermissions";
import { BackupMakerRole } from "@apis/authentication/generated";

type EntityManagerProps<T> = {
	AddComponent: (props: AddEntityProps<T>) => React.JSX.Element;
	name: string;
	title: string;
	elements: React.JSX.Element;
};

export interface AddEntityProps<T> {
	open: boolean;
	setClose: () => void;
	update?: T;
}

export function EntityManager<T>({ name, elements, AddComponent, title }: EntityManagerProps<T>) {
	const modal = useModal(false);

	const addEntity = useCallback(
		(e: React.MouseEvent) => {
			modal.setOpen();
			e.stopPropagation();
		},
		[modal]
	);

	const isAdmin = usePermissions(BackupMakerRole.Admin);

	return (
		<Stack spacing={2}>
			<AppAccordion.Frame sx={{ width: "205px" }}>
				<AppAccordion.Summary>
					<Stack direction={"row"} justifyContent={"space-between"} width={150} alignItems={"center"}>
						<Typography>{name}</Typography>
						<IconWithTooltip
							title={title}
							disabledTitle={"You must be an admin"}
							disabled={!isAdmin}
							onClick={addEntity}
							color={"success"}
							tooltipProps={{ placement: "right" }}
						>
							<Add />
						</IconWithTooltip>
					</Stack>
				</AppAccordion.Summary>
				<AppAccordion.Details>{elements}</AppAccordion.Details>
			</AppAccordion.Frame>
			<AddComponent open={modal.open} setClose={modal.setClose} />
		</Stack>
	);
}
