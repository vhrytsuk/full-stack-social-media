import { ReactNode } from 'react';

import clsx from 'clsx';

import EmptyHeader from '@/components/dummies/EmptyHeader';
import Footer from '@/components/widgets/Footer';

type PropsType = {
	children: ReactNode;
	className?: string;
};

const OneColumnClean = ({ children, className }: PropsType) => {
	return (
		<div className={clsx('flex min-h-full flex-col', className)}>
			<EmptyHeader />
			<main className="grid grow">{children}</main>
			<Footer />
		</div>
	);
};

export default OneColumnClean;
