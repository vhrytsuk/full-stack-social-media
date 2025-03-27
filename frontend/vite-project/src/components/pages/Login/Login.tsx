import { useLogin } from './useLogin';

import OneColumnClean from '@/components/layouts/OneColumnClean';
import LoginForm from '@/components/widgets/LoginForm';

const Login = () => {
	const { handleSubmitLoginForm } = useLogin();

	return (
		<OneColumnClean>
			<div className="flex h-full flex-col justify-center">
				<LoginForm handleSubmitLoginForm={handleSubmitLoginForm} />
			</div>
		</OneColumnClean>
	);
};

export default Login;
