'use client';

import { Link } from '@tanstack/react-router';

import {
	DefaultFormFileds,
	RegistrationFormFields,
	useRegistrationForm,
} from './useRegistrationForm';

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

type RegistrationFormProps = {
	className?: string;
	defaultFormFields?: DefaultFormFileds;
	handleSubmitRegistrationForm: (data: RegistrationFormFields) => void;
};

const RegistrationForm = ({
	className,
	defaultFormFields,
	handleSubmitRegistrationForm,
}: RegistrationFormProps) => {
	const { form, onSubmit } = useRegistrationForm({
		defaultFormFields,
		handleSubmitRegistrationForm,
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
								Enter your email below to login to your account
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
										name="first_name"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>
													First name
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Input your first name"
														type="text"
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
										name="last_name"
										render={({ field }) => (
											<FormItem className="grid gap-2">
												<FormLabel>Last name</FormLabel>
												<FormControl>
													<Input
														placeholder="Input your last name"
														type="text"
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
												<div className="flex items-center">
													<FormLabel>
														Password
													</FormLabel>
													<Link
														// to={Paths.FORGOT_PASSWORD}
														to="/"
														className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
													>
														Forgot your password?
													</Link>
												</div>
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
									<FormField
										control={form.control}
										name="password2"
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
										<Button
											variant="outline"
											className="w-full"
										>
											Login with Google
										</Button>
									</div>
									<div className="mt-4 text-center text-sm">
										Don&apos;t have an account?{' '}
										<Link
											to={Paths.LOGIN}
											className="underline underline-offset-4"
										>
											Sign up
										</Link>
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

export default RegistrationForm;
