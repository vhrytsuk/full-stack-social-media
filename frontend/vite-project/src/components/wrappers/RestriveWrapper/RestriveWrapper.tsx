import { ReactNode } from 'react';

import clsx from 'clsx';

type RestriveWrapperProps = {
	children: ReactNode;
	className?: string;
};

const RestriveWrapper = ({ children, className }: RestriveWrapperProps) => {
	return (
		<div
			className={clsx('max-w-7xl w-full px-4 mx-auto md:px-8', className)}
		>
			{children}
		</div>
	);
};

export default RestriveWrapper;
