import { ReactNode } from 'react';

import clsx from 'clsx';

type RestriveWrapperProps = {
	children: ReactNode;
	className?: string;
};

const RestriveWrapper = ({ children, className }: RestriveWrapperProps) => {
	return (
		<div className={clsx('max-w-7xl px-4 md:px-8', className)}>
			{children}
		</div>
	);
};

export default RestriveWrapper;
