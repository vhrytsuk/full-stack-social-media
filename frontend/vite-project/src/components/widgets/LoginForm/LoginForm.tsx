'use client';

import { Link } from '@tanstack/react-router';

import {
	DefaultLoginFormFields,
	LoginFormFields,
	useLoginForm,
} from './useLoginForm';

import PasswordInput from '@/components/dummies/PasswordInput';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RestriveWrapper from '@/components/wrappers/RestriveWrapper';
import { Paths } from '@/constants/paths';
import { cn } from '@/lib/utils';

type LoginFormProps = {
	className?: string;
	defaultFormFields?: DefaultLoginFormFields;
	handleSubmitLoginForm: (data: LoginFormFields) => void;
};

const LoginForm = ({
	className,
	defaultFormFields,
	handleSubmitLoginForm,
}: LoginFormProps) => {
	const { form, onSubmit } = useLoginForm({
		defaultFormFields,
		handleSubmitLoginForm,
	});

	return (
		<RestriveWrapper>
			<div className={cn('mx-auto w-full max-w-lg', className)}>
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								Login to your account
							</CardTitle>
							<CardDescription>
								Enter your credentials to log in
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form
									className="flex flex-col gap-6"
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder="m@example.com"
														type="email"
														required
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Password</FormLabel>
												<FormControl>
													<PasswordInput
														placeholder="Password"
														required
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex flex-col gap-6">
										<Button
											type="submit"
											className="w-full"
										>
											Login
										</Button>
										<div className="mt-4 text-center text-sm">
											Don&apos;t have an account?{' '}
											<Link
												to={Paths.REGISTER}
												className="underline underline-offset-4"
											>
												Sign up
											</Link>
										</div>
									</div>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</RestriveWrapper>
	);
};

export default LoginForm;
