import axios from 'axios';
import baseURL from '../../utils';

//* =========Content Generation============
export const contentGenerateAPI = async (inputPrompt) => {
	const response = await axios.post(
		`${baseURL}/openai/generate-content`,
		{ prompt: inputPrompt },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	);
	return response?.data;
};

export default contentGenerateAPI;
