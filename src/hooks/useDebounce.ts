import { useEffect, useState } from 'react';

export const useDebounce = <V>(value: V, delay?: number): V => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay || 500);
		return () => clearTimeout(timeout);
	}, [value, delay]);
	return debouncedValue;
};
