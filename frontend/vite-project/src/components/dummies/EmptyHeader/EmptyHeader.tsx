import Logo from '../Logo';

import RestriveWrapper from '@/components/wrappers/RestriveWrapper';

const EmptyHeader = () => {
	return (
		<RestriveWrapper className="flex justify-start">
			<Logo />
		</RestriveWrapper>
	);
};

export default EmptyHeader;
