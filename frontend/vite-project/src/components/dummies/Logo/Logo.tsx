import { Link } from '@tanstack/react-router';

import LogoIcon from '@/assets/icons/default-logo.svg?react';
import { cn } from '@/lib/utils';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<Link to="/">
			<LogoIcon
				className={cn(
					'transition delay-150 duration-300 hover:scale-105',
					className,
				)}
			/>
		</Link>
	);
};

export default Logo;
