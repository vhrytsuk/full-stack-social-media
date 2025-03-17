import { ReactNode } from 'react';

type PropsType = {
	children: ReactNode;
	className?: string;
};

const MainLayout = ({ children, className }: PropsType) => {
	return (
		<div>
			<div>{children}</div>
		</div>
	);
};

export default MainLayout;
