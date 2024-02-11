import axios from 'axios';

//* =============User Registration=========
export const registerAPI = async (userData) => {
	const response = await axios.post(
		'http://localhost:5000/api/users/register',
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
		'http://localhost:5000/api/users/login',
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
		'http://localhost:5000/api/users/auth/check',

		{
			withCredentials: true,
		}
	);
	return response?.data;
};

//* =============User logout=========
export const logoutAPI = async () => {
	const response = await axios.post(
		'http://localhost:5000/api/users/logout',
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
		'http://localhost:5000/api/users/profile',

		{
			withCredentials: true,
		}
	);
	return response?.data;
};
