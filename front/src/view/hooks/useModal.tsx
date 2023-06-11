import React, { useCallback } from "react";

/**
 *
 * @param defaultState initial state of modal (open or not)
 */
export function useModal(defaultState: boolean) {
	const [state, setOpen] = React.useState<boolean>(defaultState);

	const open = useCallback(
		(e?: any) => {
			e?.stopPropagation();
			if (!state) {
				setOpen(true);
			}
		},
		[state]
	);
	const close = useCallback(
		(e?: any) => {
			e?.stopPropagation();
			if (state) {
				setOpen(false);
			}
		},
		[state]
	);

	return {
		open: state,
		setOpen: open,
		setClose: close,
	};
}
