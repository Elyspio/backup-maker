import { useEffect, useState } from "react";

/**
 * Create a state from a prop that auto update when the prop is updated
 * @param prop
 */
export function usePropsState<T>(prop: T) {
	const [state, setState] = useState(prop);

	useEffect(() => {
		setState(prop);
	}, [prop]);

	return [state, setState] as const;
}
