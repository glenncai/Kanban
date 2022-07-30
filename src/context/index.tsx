import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const AppProviders = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
};
