import { useEffect } from "react";

export function useRenderCount<T>(name: string, prop: T) {
	useEffect(() => {
		console.count(`render caused by ${name}`);
	}, [name, prop]);
}
