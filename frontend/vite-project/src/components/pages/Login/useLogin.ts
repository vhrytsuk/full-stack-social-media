import { useMutation } from '@tanstack/react-query';

import { loginUser, refreshUserToken } from '@/api/auth';
import { LoginUser } from '@/models/user/api';

export const useLogin = () => {
	const { mutate: loginFormMutation, isPending: loginFormLoading } =
		useMutation({
			mutationFn: loginUser,
			onSuccess: async () => {
				const res = await refreshUserToken();

				console.log('Login success', res);
			},
		});

	const handleSubmitLoginForm = (data: LoginUser) => {
		loginFormMutation(data);
	};

	return {
		handleSubmitLoginForm,
		loginFormLoading,
	};
};
