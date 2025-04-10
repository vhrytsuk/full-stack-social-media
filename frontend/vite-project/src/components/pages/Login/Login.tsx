import OneColumnClean from '@/components/layouts/OneColumnClean';
import LoginUser from '@/components/widgets/LoginUser';

const Login = () => {
	return (
		<OneColumnClean>
			<div className="flex h-full flex-col justify-center">
				<LoginUser />
			</div>
		</OneColumnClean>
	);
};

export default Login;
