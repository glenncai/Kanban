import { User } from 'types/project';
import { API_BASE_URL } from 'data/environment';

const localStorageKey = '__auth_provider_token__';

export const getToken = () => {
	if (typeof window === 'undefined') {
		return '';
	}
	return window.localStorage.getItem(localStorageKey);
};

export const handleUserResponse = ({ user }: { user: User }) => {
	window.localStorage.setItem(localStorageKey, user.token || '');
	return user;
};

export const login = (data: { username: string; password: string }) => {
	return fetch(`${API_BASE_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(async (response) => {
		if (response.ok) {
			return handleUserResponse(await response.json());
		} else {
			return Promise.reject(await response.json());
		}
	});
};

export const register = (data: { username: string; password: string }) => {
	return fetch(`${API_BASE_URL}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(async (response) => {
		if (response.ok) {
			return handleUserResponse(await response.json());
		} else {
			return Promise.reject(await response.json());
		}
	});
};

export const logout = async () => window.localStorage.removeItem(localStorageKey);
