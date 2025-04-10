import { createFileRoute, redirect } from '@tanstack/react-router';

import Register from '@/components/pages/Register';
import { Paths } from '@/constants/paths';

export const Route = createFileRoute(Paths.REGISTER)({
	component: Register,
	beforeLoad: async ({ context, location }) => {
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
