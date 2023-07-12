import React, { PropsWithChildren } from "react";
import { ButtonProps, IconButton, IconButtonProps, Tooltip, TooltipProps } from "@mui/material";

type DisabledTooltipProps = PropsWithChildren<{
	// Title when the button is not disabled
	title: string;
	// Title when the button is disabled
	disabledTitle: string;
	// A boolean that receives a true or false value based on the button's disabled state
	disabled: boolean;
	// Function that is executed when the button is clicked
	onClick: ButtonProps["onClick"];
	// IconButton's color
	color: IconButtonProps["color"];
	// Optional prop that passes additional properties to the Tooltip component
	tooltipProps?: Partial<TooltipProps>;
}>;

export function IconWithTooltip({ color, disabled, title, children, disabledTitle, onClick, tooltipProps = {} }: DisabledTooltipProps) {
	return (
		<Tooltip {...tooltipProps} title={disabled ? disabledTitle : title}>
			<div>
				<IconButton color={color} onClick={onClick} disabled={disabled}>
					{children}
				</IconButton>
			</div>
		</Tooltip>
	);
}
