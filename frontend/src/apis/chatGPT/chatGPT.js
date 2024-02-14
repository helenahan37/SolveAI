import axios from 'axios';

//* =========Content Generation============
export const contentGenerateAPI = async (inputPrompt) => {
	const response = await axios.post(
		'http://localhost:5000/api/openai/generate-content',
		{ prompt: inputPrompt },
		{
			withCredentials: true,
		}
	);
	return response?.data;
};

export default contentGenerateAPI;
