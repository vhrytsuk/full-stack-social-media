import { http } from '@/app/config/axios/http';
import appConfig from '@/constants/appConfig';
import { CreateUser, LoginUser } from '@/models/user/api';

const defaultPath = `api/${appConfig.api.version}/auth/`;

export const registrationUser = async (data: CreateUser) => {
	try {
		const response = await http.post(`${defaultPath}register/`, data);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const loginUser = async (data: LoginUser) => {
	try {
		const response = await http.post(`${defaultPath}login/`, data);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const refreshUserToken = async () => {
	try {
		const response = await http.post(`${defaultPath}refresh-token/`);

		return response.data;
	} catch (error) {
		return error;
	}
};

// export const sendOtpCode = async (email: string) => {
// 	try {
// 		const response = await http.post(`${defaultPath}send-otp/`, { email });

// 		return response.data;
// 	} catch (error) {
// 		return error;
// 	}
// };

export const verifyOtpCode = async ({
	otpCode,
	email,
}: {
	otpCode: string;
	email: string;
}) => {
	try {
		const response = await http.post(`${defaultPath}verify-email/`, {
			otpCode,
			email,
		});

		return response.data;
	} catch (error) {
		return error;
	}
};
