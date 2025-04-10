import LoginForm from './components/LoginForm';
import { useLoginUser } from './useLoginUser';

const LoginUser = () => {
	const { handleSubmitLoginForm, formSubmitPending, authLoading } =
		useLoginUser();

	if (authLoading) {
		return null;
	}

	return (
		<LoginForm
			handleSubmitLoginForm={handleSubmitLoginForm}
			submitPending={formSubmitPending}
		/>
	);
};

export default LoginUser;
