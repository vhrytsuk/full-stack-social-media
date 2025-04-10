import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import { loginUser } from '@/api/auth';
import { Paths } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';
import { LoginUser } from '@/models/user/api';

export const useLoginUser = () => {
	const router = useRouter();
	const { token, loading: authLoading } = useAuth();

	const { mutate: loginFormMutation, isPending: formSubmitPending } =
		useMutation({
			mutationFn: loginUser,
			onSuccess: (data) => {
				if (data?.email) {
					router.navigate({ to: Paths.HOME });
				}
			},
		});

	const handleSubmitLoginForm = (data: LoginUser) => {
		loginFormMutation(data);
	};

	useEffect(() => {
		if (token) {
			router.navigate({ to: Paths.HOME });
		}
	}, [token, router]);

	return {
		handleSubmitLoginForm,
		formSubmitPending,
		authLoading,
	};
};
