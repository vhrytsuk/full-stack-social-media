import OneColumnClean from '@/components/layouts/OneColumnClean';
import RegistrationUser from '@/components/widgets/RegistrationUser';

const Register = () => {
	return (
		<OneColumnClean>
			<div className="flex h-full flex-col justify-center">
				<RegistrationUser />
			</div>
		</OneColumnClean>
	);
};

export default Register;
