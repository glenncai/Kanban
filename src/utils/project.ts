import { useHttp } from 'hooks/useHttp';
import { useOptimistic } from 'hooks/useOptimistic';
import { Project } from 'types/project';
import { cleanObject } from 'utils';
import { useMutation, useQuery, QueryKey } from 'react-query';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(['projects', param], () =>
    client('projects', { data: cleanObject(param || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useOptimistic<Project>({
      queryKey,
      callback: (target, old) =>
        old?.map((item) =>
          item.id === target.id ? { ...item, ...target } : item
        ) || []
    })
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    useOptimistic<unknown>({
      queryKey,
      callback: (target, old) => (old ? [...old, target] : [])
    })
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE'
      }),
    useOptimistic<Project>({
      queryKey,
      callback: (target, old) =>
        old?.filter((item) => item.id !== target.id) || []
    })
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  );
};
