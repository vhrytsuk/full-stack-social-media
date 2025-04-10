import { RouterProvider, createRouter } from '@tanstack/react-router';

import { useAuth } from '@/hooks/useAuth';
import { routeTree } from '@/routeTree.gen';

const router = createRouter({
	routeTree,
	context: {
		auth: {
			isLoggedIn: false,
			token: null,
			loading: true,
		},
	},
	//TODO: add spiner
	defaultPendingComponent: () => <div>Loading...</div>,
	//TODO: add error component
	defaultErrorComponent: ({ error }) => (
		<div>Something happend{error.message}</div>
	),
	// defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const RouteProvider: React.FC = () => {
	const auth = useAuth();

	return <RouterProvider router={router} context={{ auth }} />;
};

export default RouteProvider;
