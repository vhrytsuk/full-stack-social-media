import { createFileRoute, redirect } from '@tanstack/react-router';

import Login from '@/components/pages/Login';
import { Paths } from '@/constants/paths';

export const Route = createFileRoute(Paths.LOGIN)({
	component: Login,
	beforeLoad: ({ context, location }) => {
		console.log('context', context);
		if (context.auth?.isLoggedIn) {
			throw redirect({
				to: Paths.HOME,
				search: {
					redirect: location.href,
				},
			});
		}
	},
});
