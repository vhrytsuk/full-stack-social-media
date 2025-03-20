import { ReactNode } from 'react';

import clsx from 'clsx';

import Footer from '@/components/widgets/Footer';
import Header from '@/components/widgets/Header';

type PropsType = {
	children: ReactNode;
	className?: string;
};

const DefaultLayout = ({ children, className }: PropsType) => {
	return (
		<div className={clsx('min-h-full flex flex-col', className)}>
			<Header />
			<main className="grow">{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
