import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { registrationUser, verifyOtpCode } from '@/api/auth';
import { Paths } from '@/constants/paths';
import { CreateUser } from '@/models/user/api';

export const useRegister = () => {
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const { mutate: registrationFormMutation, isPending: registrationLoading } =
		useMutation({
			mutationFn: registrationUser,
			onSuccess: (data) => {
				if (data.email) {
					setIsOtpSent(true);
				}
			},
		});

	const { mutate: otpFormMutation, isPending: otpValidationLoading } =
		useMutation({
			mutationFn: verifyOtpCode,
			onSuccess: (data) => {
				if (data) {
					navigate({ to: Paths.LOGIN });
				}
			},
		});

	const handleSubmitOtpForm = (otpCode: string) => {
		otpFormMutation({ otpCode, email });
		console.log(otpCode);
	};

	const handleSubmitRegistrationForm = (data: CreateUser) => {
		registrationFormMutation(data);
		setEmail(data.email);
	};

	return {
		handleSubmitOtpForm,
		handleSubmitRegistrationForm,
		isLoading: registrationLoading || otpValidationLoading,
		isOtpSent,
	};
};
