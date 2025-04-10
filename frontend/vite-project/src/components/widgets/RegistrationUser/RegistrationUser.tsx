import OtpForm from './components/OtpForm';
import RegistrationForm from './components/RegistrationForm';
import { useRegistrationUser } from './useRegistrationUser';

const RegistrationUser = () => {
	const { handleSubmitOtpForm, handleSubmitRegistrationForm, isOtpSent } =
		useRegistrationUser();

	return isOtpSent ? (
		<OtpForm handleSubmitOtpForm={handleSubmitOtpForm} />
	) : (
		<RegistrationForm
			handleSubmitRegistrationForm={handleSubmitRegistrationForm}
		/>
	);
};

export default RegistrationUser;
