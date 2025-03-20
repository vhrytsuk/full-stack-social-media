import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [queryClient] = useState(new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
		</QueryClientProvider>
	);
};

export default QueryProvider;
