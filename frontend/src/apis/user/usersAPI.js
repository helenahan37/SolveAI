import axios from 'axios';
import baseURL from '../../utils';

//* =============User Registration=========
export const registerAPI = async (userData) => {
	const response = await axios.post(`${baseURL}/users/register`, {
		username: userData?.username,
		email: userData?.email,
		password: userData?.password,
	});
	return response?.data;
};

//* =====User login=========
export const loginAPI = async (userData) => {
	const response = await axios.post(`${baseURL}/users/login`, {
		email: userData?.email,
		password: userData?.password,
	});
	const token = response?.data?.token;
	if (token) {
		localStorage.setItem('token', token);
	}

	return response?.data;
};

//* =============Check Auth=========
export const checkAuthAPI = async () => {
	const token = localStorage.getItem('token');
	const response = await axios.get(`${baseURL}/users/auth/check`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response?.data;
};

//* =============User logout=========
export const logoutAPI = async () => {
	const token = localStorage.getItem('token');

	const response = await axios.post(
		`${baseURL}/users/logout`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	localStorage.removeItem('token');

	return response?.data;
};

//* ==========Get UserProfile=========
export const getUserProfileAPI = async () => {
	const token = localStorage.getItem('token');

	const response = await axios.get(`${baseURL}/users/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response?.data;
};

//* ==========Delete ContentHistory=========
export const deleteContentAPI = async (contentId) => {
	const token = localStorage.getItem('token');
	const response = await axios.delete(`${baseURL}/users/content-delete/${contentId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response?.data;
};
