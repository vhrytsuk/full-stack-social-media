import { useRegister } from './useRegister';

import OneColumnClean from '@/components/layouts/OneColumnClean';
import OtpForm from '@/components/widgets/OtpForm';
import RegistrationForm from '@/components/widgets/RegistrationForm';

const Register = () => {
	const { handleSubmitOtpForm, handleSubmitRegistrationForm, isOtpSent } =
		useRegister();

	return (
		<OneColumnClean>
			<div className="flex h-full flex-col justify-center">
				{isOtpSent ? (
					<OtpForm handleSubmitOtpForm={handleSubmitOtpForm} />
				) : (
					<RegistrationForm
						handleSubmitRegistrationForm={
							handleSubmitRegistrationForm
						}
					/>
				)}
			</div>
		</OneColumnClean>
	);
};

export default Register;
