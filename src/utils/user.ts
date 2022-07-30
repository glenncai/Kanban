import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { User } from 'types/project';
import { useHttp } from 'hooks/useHttp';
import { useAsync } from 'hooks/useAsync';

export const useUsers = (param?: Partial<User>) => {
	const client = useHttp();
	const { run, ...result } = useAsync<User[]>();

	// Render users when component is mounted
	useEffect(() => {
		run(client('users', { data: cleanObject(param || {}) }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param]);

	return result;
};
