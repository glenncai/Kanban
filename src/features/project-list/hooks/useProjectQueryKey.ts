import { useProjectSearchParams } from './useProjectSearchParams';

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ['projects', params];
};
