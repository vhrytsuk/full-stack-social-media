import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import formConfig from '@/constants/formConfig';

export type RegistrationFormFields = z.infer<typeof FormSchema>;
export type DefaultFormFileds = Partial<RegistrationFormFields>;

type UseRegistrationFormProps = {
	defaultFormFields?: DefaultFormFileds;
	handleSubmitRegistrationForm: (data: RegistrationFormFields) => void;
};

const FormSchema = z
	.object({
		email: z
			.string()
			.min(formConfig.email.minLength, {
				message: `Username must be at least ${formConfig.email.minLength} characters.`,
			})
			.email({ message: 'Must be a valid email' }),
		first_name: z.string().min(formConfig.first_name.minLength, {
			message: `First name must be at least ${formConfig.last_name.minLength} characters`,
		}),
		last_name: z.string().min(formConfig.last_name.minLength, {
			message: `Last name must be at least ${formConfig.last_name.minLength} characters`,
		}),
		password: z.string().min(formConfig.password.minLength, {
			message: `Password must be at least ${formConfig.password.minLength} characters`,
		}),
		password2: z.string().min(formConfig.password.minLength, {
			message: `Password must be at least ${formConfig.password.minLength} characters`,
		}),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.password2) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password is not the same as confirm password',
				path: ['password2'],
			});
		}
		return true;
	});

export const useRegistrationForm = ({
	defaultFormFields = {},
	handleSubmitRegistrationForm,
}: UseRegistrationFormProps) => {
	const form = useForm<RegistrationFormFields>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
			password2: '',
			first_name: '',
			last_name: '',
			...defaultFormFields,
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		handleSubmitRegistrationForm(data);
	};

	return {
		form,
		onSubmit,
	};
};
