import qs from 'qs';
import * as auth from 'services/auth';
import { API_BASE_URL } from 'data/environment';

interface Config extends RequestInit {
	data?: object;
	token?: string;
}

export const http = async (endpoint: string, { data, token, headers, ...customConFig }: Config = {}) => {
	const config = {
		method: 'GET',
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': data ? 'application/json' : ''
		},
		...customConFig
	};

	if (config.method.toUpperCase() === 'GET') {
		endpoint += `?${qs.stringify(data)}`;
	} else {
		config.body = JSON.stringify(data);
	}

	return window.fetch(`${API_BASE_URL}/${endpoint}`, config).then(async (response) => {
		if (response.status === 401) {
			await auth.logout();
			window.location.reload();
			return Promise.reject({ message: '请重新登录' });
		}
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			return Promise.reject(data);
		}
	});
};
