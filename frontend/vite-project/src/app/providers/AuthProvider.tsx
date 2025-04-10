'use client';

import {
	createContext,
	useEffect,
	useLayoutEffect,
	useState,
	type ReactNode,
} from 'react';

import { InternalAxiosRequestConfig as OriginalInternalAxiosRequestConfig } from 'axios';

import { http } from '../config/axios/http';

import { refreshUserToken, validateAccessToken } from '@/api/auth';

interface InternalAxiosRequestConfig
	extends OriginalInternalAxiosRequestConfig {
	_retry?: boolean;
}

type AuthProviderProps = {
	children: ReactNode;
};

export type AuthContextType = {
	isLoggedIn: boolean;
	token: string | null;
	loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const data = await validateAccessToken();

				if (data.accessToken) {
					setToken(data.accessToken);
					setLoading(false);
				}
			} catch {
				setToken(null);
			}
		};

		fetchToken();
	}, []);

	useLayoutEffect(() => {
		const authInterceptor = http.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				config.headers.Authorization =
					!config._retry && token
						? `Bearer ${token}`
						: config.headers.Authorization;

				return config;
			},
		);

		return () => {
			http.interceptors.request.eject(authInterceptor);
		};
	}, [token]);

	useLayoutEffect(() => {
		const refreshInterceptor = http.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;

				if (error.response?.status === 401) {
					setLoading(false);
				}

				//TODO: chech later status and condition
				if (error.response?.status === 403) {
					try {
						const data = await refreshUserToken();

						const accessToken = data.accessToken;

						if (accessToken) {
							setToken(accessToken);

							originalRequest.headers.Authorization = `Bearer ${accessToken}`;
							originalRequest._retry = true;
						} else {
							setToken(null);
						}

						return http(originalRequest);
					} catch {
						setToken(null);
					} finally {
						setLoading(false);
					}
				}

				return Promise.reject(error);
			},
		);

		return () => {
			http.interceptors.request.eject(refreshInterceptor);
		};
	}, []);

	const value = {
		isLoggedIn: !!token,
		token: token,
		loading,
	};

	if (loading) {
		return null;
	}

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

// TODO: think about response/ request interceptors
// Check api working and cover all function with types
// TODO: check loading state
