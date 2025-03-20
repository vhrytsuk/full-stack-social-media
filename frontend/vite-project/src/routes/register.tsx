import { createFileRoute } from '@tanstack/react-router';

import Register from '@/components/pages/Register';
import { Paths } from '@/constants/paths';

export const Route = createFileRoute(Paths.REGISTER)({
	component: Register,
});
