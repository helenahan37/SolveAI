import axios from 'axios';
import baseURL from '../../utils';

//* =============User Registration=========
export const registerAPI = async (userData) => {
	const response = await axios.post(
		`${baseURL}/users/register`,
		{
			username: userData?.username,
			email: userData?.email,
			password: userData?.password,
		},
		{
			withCredentials: true,
		}
	);
	return response?.data;
};

//* =============User login=========
export const loginAPI = async (userData) => {
	const response = await axios.post(
		`${baseURL}/users/login`,
		{
			email: userData?.email,
			password: userData?.password,
		},
		{
			withCredentials: true,
		}
	);
	return response?.data;
};

//* =============Check Auth=========
export const checkAuthAPI = async () => {
	const response = await axios.get(
		`${baseURL}/users/auth/check`,

		{
			withCredentials: true,
		}
	);
	return response?.data;
};

//* =============User logout=========
export const logoutAPI = async () => {
	const response = await axios.post(
		`${baseURL}/users/logout`,
		{},
		{
			withCredentials: true,
		}
	);
	return response?.data;
};

//* ==========Get UserProfile=========
export const getUserProfileAPI = async () => {
	const response = await axios.get(
		`${baseURL}/users/profile`,

		{
			withCredentials: true,
		}
	);
	return response?.data;
};

//* ==========Delete ContentHistory=========

export const deleteContentAPI = async (contentId) => {
	const response = await axios.delete(
		`${baseURL}/users/content-delete/${contentId}`,

		{
			withCredentials: true,
		}
	);
	return response?.data;
};
