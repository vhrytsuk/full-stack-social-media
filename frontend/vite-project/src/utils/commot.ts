export const isAuthPage = (pathname: string): boolean => {
	const authPages = [
		'login',
		'register',
		'forgot-password',
		'reset-password',
	];

	return authPages.some((page) => pathname.includes(page));
};
