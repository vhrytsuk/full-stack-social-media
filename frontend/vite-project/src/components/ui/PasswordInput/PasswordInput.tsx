import { forwardRef, useState } from 'react';

import { EyeIcon } from '@heroicons/react/24/solid';
import { EyeSlashIcon } from '@heroicons/react/24/solid';

import { Button } from '@/components/ui/Button/button';
import { Input, InputProps } from '@/components/ui/Input/input';
import { cn } from '@/lib/utils';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);

		return (
			<div className="relative">
				<Input
					type={showPassword ? 'text' : 'password'}
					className={cn('hide-password-toggle pr-10', className)}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{showPassword ? (
						<EyeIcon className="h-4 w-4" aria-hidden="true" />
					) : (
						<EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
					)}
					<span className="sr-only">
						{showPassword ? 'Hide password' : 'Show password'}
					</span>
				</Button>

				<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
			</div>
		);
	},
);

export default PasswordInput;
