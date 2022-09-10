import { http } from 'lib/fetch';
import { useAuth } from 'hooks/useAuth';
import { useCallback } from 'react';

// Fetch request with token
export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
