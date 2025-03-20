import { Link } from '@tanstack/react-router';

import LogoIcon from '@/assets/icons/default-logo.svg?react';

const Logo = () => {
	return (
		<Link to="/">
			<LogoIcon className="hover:scale-105 transition delay-150 duration-300" />
		</Link>
	);
};

export default Logo;
