import { useContext } from 'react';

import { AuthContext, AuthContextType } from '@/app/providers/AuthProvider';

//TODO: thingk about right palse for this hook
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
