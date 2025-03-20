import { createFileRoute } from '@tanstack/react-router';

import Home from '@/components/pages/Home';
import NotFound from '@/components/pages/NotFound';
import { Paths } from '@/constants/paths';

export const Route = createFileRoute(Paths.HOME)({
	component: Home,
	notFoundComponent: NotFound,
});
