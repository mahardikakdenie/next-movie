import axios, { AxiosError, AxiosResponse } from 'axios';

const url = process.env.NEXT_PUBLIC_BASE_API_URL || 'https://api.jikan.moe/v4';

// Assuming `getLocalStorage` is a utility function to get a value from localStorage
// const token: string | null = getLocalStorage('token') ?? '';

const globalResponseHandler = (response: AxiosResponse): AxiosResponse =>
	response;

const globalErrorHandler = (error: AxiosError): Promise<never> => {
	const status = error.response?.status;
	const isTokenExpired = status === 401;
	if (isTokenExpired) {
		// removeLocalStorage('token');
		// removeLocalStorage('oo_token');
		const originalRequest = error.config;
		if (originalRequest) {
			delete originalRequest.headers.Authorization;
		}
		window.location.href = '/';
	}
	return Promise.reject(error);
};

const token = ''; // Replace with the actual token logic
const client = axios.create({
	baseURL: url,
	withCredentials: false,
	// headers: {
	// 	Authorization: `Bearer ${token}`,
	// 	'Cache-Control': 'no-cache',
	// 	'Content-Type': 'application/x-www-form-urlencoded',
	// 	'Access-Control-Allow-Origin': '*',
	// },
});

// Add a response interceptor
client.interceptors.response.use(globalResponseHandler, globalErrorHandler);

export default client;
