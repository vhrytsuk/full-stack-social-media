import { toast, TypeOptions } from 'react-toastify';

export const getToastMessage = (message: string, type: TypeOptions) => {
	toast(message, {
		type: type,
	});
};
