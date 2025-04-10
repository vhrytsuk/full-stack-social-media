import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './providers/AuthProvider';
import QueryProvider from './providers/QueryProvider';
import RouteProvider from './providers/RouteProvider';

export const App = () => {
	return (
		<AuthProvider>
			<QueryProvider>
				<RouteProvider />
				<ToastContainer />
			</QueryProvider>
		</AuthProvider>
	);
};
