'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RestriveWrapper from '@/components/wrappers/RestriveWrapper';
import { Paths } from '@/constants/paths';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
	email: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string().min(8, {
		message: 'Username must be at least 2 characters.',
	}),
});

const RegistrationForm = ({
	className,
}: React.ComponentPropsWithoutRef<'div'>) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<RestriveWrapper>
			<div className="max-w-lg w-full mx-auto">
				<div className={cn('flex flex-col gap-6', className)}>
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Login</CardTitle>
							<CardDescription>
								Enter your email below to login to your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form className="flex flex-col gap-6">
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
