import axios from 'axios';
import baseURL from '../../utils';

//* =========Content Generation============
export const contentGenerateAPI = async (inputPrompt) => {
	const response = await axios.post(
		`${baseURL}/openai/generate-content`,
		{ prompt: inputPrompt },
		{
			withCredentials: true,
		}
	);
	return response?.data;
};

export default contentGenerateAPI;
