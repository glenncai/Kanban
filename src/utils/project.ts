import { useEffect } from 'react';
import { useAsync } from 'hooks/useAsync';
import { useHttp } from 'hooks/useHttp';
import { Project } from 'types/project';
import { cleanObject } from 'utils';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = () =>
    client('projects', { data: cleanObject(param || {}) });

  // Render the list when user enter the input field
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      })
    );
  };
  return {
    mutate,
    ...asyncResult
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST'
      })
    );
  };
  return {
    mutate,
    ...asyncResult
  };
};
