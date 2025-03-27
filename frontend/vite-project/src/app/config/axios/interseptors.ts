import { AxiosResponse, isAxiosError } from 'axios';
import { camelizeKeys } from 'humps';
// import { t } from 'i18next';

// import {
// 	excludedErrorCodes,
// 	excludedErrorPaths,
// } from '@/constants/excludedErrors';
// import { getErrorMessage, getErrorType } from '@/utils/errors';
import { getToastMessage } from '@/utils/toastMessage';

export const interceptors = {
	onSuccess: (response: AxiosResponse) => {
		if (
			response.data &&
			response.headers['content-type'].includes('application/json')
		) {
			response.data = camelizeKeys(response.data);
		}

		const message =
			response.data?.message ||
			response.data?.detail ||
			'Requset is successfull';

		getToastMessage(message, 'success');

		return response.data ? response.data : response;
	},
	onError: (error: Error) => {
		if (isAxiosError(error)) {
			const statusCode = error.response?.status;
			const requestUrl = error.config?.url;

			if (
				statusCode &&
				requestUrl
				// !excludedErrorPaths[requestUrl]?.includes(statusCode) &&
				// !excludedErrorCodes.includes(statusCode)
			) {
				// const type = getErrorType(error);

				// const message = t(getErrorMessage(type));
				const message =
					error?.response?.data?.message ||
					error?.response?.data?.detail ||
					'Something went wrong';

				getToastMessage(message, 'error');
			}
		}
		Promise.reject(error);
	},
};
