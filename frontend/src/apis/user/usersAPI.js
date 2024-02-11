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
