import { useEffect } from 'react';
import { useAsync } from 'hooks/useAsync';
import { useHttp } from 'hooks/useHttp';
import { Project } from 'types/project';
import { cleanObject } from 'utils';

export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp();
	const { run, ...result } = useAsync<Project[]>();

	// Render the list when user enter the input field
	useEffect(() => {
		run(client('projects', { data: cleanObject(param || {}) }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param]);

	return result;
};
