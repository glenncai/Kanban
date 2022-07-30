import { http } from 'lib/fetch';
import { useAuth } from 'hooks/useAuth';

// Fetch request with token
export const useHttp = () => {
	const { user } = useAuth();
	return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });
};
