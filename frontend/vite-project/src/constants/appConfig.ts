export default {
	api: {
		version: 'v1',
		baseUrl: import.meta.env.VITE_BACKEND_URL,
		env: import.meta.env.VITE_NODE_ENV,
	},
};
console.log(import.meta.env);
