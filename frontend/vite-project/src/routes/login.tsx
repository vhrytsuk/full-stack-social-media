import { createFileRoute } from '@tanstack/react-router';

import Login from '@/components/pages/Login';
import { Paths } from '@/constants/paths';

export const Route = createFileRoute(Paths.LOGIN)({
	component: Login,
});
