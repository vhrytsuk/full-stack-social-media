import { Fragment } from 'react';

import {
	Outlet,
	createRootRouteWithContext,
	redirect,
} from '@tanstack/react-router';

import { Paths } from '@/constants/paths';
import { isAuthPage } from '@/utils/commot';

// export const Route = createRootRoute({
// 	component: RootComponent,
// });

type RootRouteContext = {
	auth: {
		isLoggedIn: boolean;
		token: string | null;
		loading: boolean;
	};
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
	component: RootComponent,
	beforeLoad({ context, location }) {
		if (!context.auth.isLoggedIn && !isAuthPage(location.pathname)) {
			throw redirect({
				to: Paths.LOGIN,
				search: {
					redirect: location.href,
					throw: true,
				},
			});
		}
	},
});

function RootComponent() {
	return (
		<Fragment>
			<Outlet />
		</Fragment>
	);
}
