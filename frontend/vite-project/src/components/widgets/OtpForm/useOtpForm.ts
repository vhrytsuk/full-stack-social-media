import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: 'Your one-time password must be 6 characters.',
	}),
});

type OtpFormProps = {
	handleSubmitOtpForm: (otpCode: string) => void;
};

export const useOtpForm = ({ handleSubmitOtpForm }: OtpFormProps) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: '',
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		handleSubmitOtpForm(data.pin);
	};

	return {
		form,
		onSubmit,
	};
};
