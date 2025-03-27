import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify';

import QueryProvider from './providers/QueryProvider';

import { routeTree } from '@/routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export const App = () => {
	return (
		<QueryProvider>
			<RouterProvider router={router} />
			<ToastContainer />
		</QueryProvider>
	);
};
