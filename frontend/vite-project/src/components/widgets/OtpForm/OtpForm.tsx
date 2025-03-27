'use client';

import { useOtpForm } from './useOtpForm';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import RestriveWrapper from '@/components/wrappers/RestriveWrapper';
import { cn } from '@/lib/utils';

type OtpFormProps = {
	className?: string;
	handleSubmitOtpForm: (otpCode: string) => void;
};

const OtpForm = ({ className, handleSubmitOtpForm }: OtpFormProps) => {
	const { form, onSubmit } = useOtpForm({ handleSubmitOtpForm });

	return (
		<RestriveWrapper>
			<div className={cn('mx-auto w-full max-w-lg', className)}>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6"
					>
						<FormField
							control={form.control}
							name="pin"
							render={({ field }) => (
								<FormItem>
									<FormLabel>One-Time Password</FormLabel>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>
										Please enter the one-time password sent
										to your phone.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</RestriveWrapper>
	);
};

export default OtpForm;
