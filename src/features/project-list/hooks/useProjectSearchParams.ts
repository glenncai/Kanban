import { useUrlQueryParam } from 'hooks/useUrlQueryParam';
import { useMemo } from 'react';

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    useMemo(
      () => ({ ...param, personId: +param.personId || undefined }),
      [param]
    ),
    setParam
  ] as const;
};
