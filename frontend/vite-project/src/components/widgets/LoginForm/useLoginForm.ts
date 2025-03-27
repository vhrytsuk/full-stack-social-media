// useLoginForm.ts
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import formConfig from '@/constants/formConfig';

export const LoginFormSchema = z.object({
	email: z
		.string()
		.min(formConfig.email.minLength, {
			message: `Email must be at least ${formConfig.email.minLength} characters.`,
		})
		.email({ message: 'Must be a valid email' }),
	password: z.string().min(formConfig.password.minLength, {
		message: `Password must be at least ${formConfig.password.minLength} characters.`,
	}),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;
export type DefaultLoginFormFields = Partial<LoginFormFields>;

type UseLoginFormProps = {
	defaultFormFields?: DefaultLoginFormFields;
	handleSubmitLoginForm: (data: LoginFormFields) => void;
};

export const useLoginForm = ({
	defaultFormFields = {},
	handleSubmitLoginForm,
}: UseLoginFormProps) => {
	const form = useForm<LoginFormFields>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
			...defaultFormFields,
		},
	});

	const onSubmit = (data: LoginFormFields) => {
		handleSubmitLoginForm(data);
	};

	return {
		form,
		onSubmit,
	};
};
