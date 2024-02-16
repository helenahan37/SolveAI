import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserProfileAPI } from '../../apis/user/usersAPI';
import StatusMessage from '../Alert/statusMessage';
import { contentGenerateAPI } from '../../apis/chatGPT/chatGPT';
import { useMutation } from '@tanstack/react-query';
import generator from '../../assets/generator.png';
import { useNavigate } from 'react-router-dom';

const AIContentGenerator = () => {
	const [generatedContent, setGeneratedContent] = useState('');

	// Query for fetching user profile
	const { isLoading, data, isError, error } = useQuery({ queryFn: getUserProfileAPI, queryKey: ['userProfile'] });

	//mutation
	const mutation = useMutation({ mutationFn: contentGenerateAPI });
	// Formik setup for handling form data
	const formik = useFormik({
		initialValues: {
			prompt: '',
			tone: '',
			category: '',
		},
		validationSchema: Yup.object({
			prompt: Yup.string().required('A prompt is required'),
			tone: Yup.string().required('Selecting a tone is required'),
			category: Yup.string().required('Selecting a category is required'),
		}),
		onSubmit: (values) => {
			mutation.mutate(`Topic: ${values?.prompt}, Tone: ${values?.tone}, Category: ${values?.category}`);
			setGeneratedContent(`Generated content for prompt: ${values?.prompt}`);
		},
	});

	const navigate = useNavigate();

	const goToHistory = () => {
		navigate('/history'); // 使用 navigate 函数跳转到指定的路由
	};

	if (isLoading) {
		return <StatusMessage type="loading" message="Loading please wait..." />;
	} else if (isError) {
		return <StatusMessage type="error" message={error?.response?.data?.message} />;
	} else {
		return (
			<div
				className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6"
				style={{
					backgroundImage: `url(${generator})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}>
				<div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl w-full p-6">
					<h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">AI Content Generator</h2>

					{/* Display loading message */}
					{mutation?.isPending && <StatusMessage type="loading" message="Generating content please wait..." />}

					{/* Display success message */}
					{mutation?.isSuccess && <StatusMessage type="success" message="Content generated sucessfully" />}

					{/* Display error message */}
					{mutation?.isError && <StatusMessage type="error" message={mutation?.error?.response?.data?.message} />}

					<div className="flex mt-5">
						<div className="mr-2 mb-4">
							<span className="text-sm font-semibold bg-green-200 px-4 py-2 rounded-full">
								Plan: {data?.user?.subscriptionPlan}
							</span>
						</div>
						<div className="mr-2 mb-4">
							<span className="text-sm font-semibold bg-green-200 px-4 py-2 rounded-full">
								Credit: {data?.user?.apiRequestCount}/{data?.user?.monthlyRequestCount}
							</span>
						</div>
					</div>

					{/* Form for generating content */}
					<form onSubmit={formik.handleSubmit} className="space-y-4">
						{/* Prompt input field */}
						<div>
							<label htmlFor="prompt" className="block text-gray-700 text-sm font-semibold mb-2">
								Enter a topic or idea
							</label>
							<input
								id="prompt"
								type="text"
								{...formik.getFieldProps('prompt')}
								className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
								placeholder="Enter a topic or idea"
							/>
							{formik.touched.prompt && formik.errors.prompt && (
								<div className="text-red-500 mt-1">{formik.errors.prompt}</div>
							)}
						</div>

						{/* Tone selection field */}
						<div>
							<label htmlFor="tone" className="block text-gray-700 text-sm font-semibold mb-2">
								Select Tone
							</label>
							<select
								id="tone"
								{...formik.getFieldProps('tone')}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
								<option value="">Choose a tone...</option>
								<option value="formal">Formal</option>
								<option value="informal">Informal</option>
								<option value="humorous">Humorous</option>
								<option value="inspirational">Inspirational</option>
								<option value="friendly">Friendly</option>
								<option value="casual">Casual</option>
							</select>
							{formik.touched.tone && formik.errors.tone && (
								<div className="text-red-500 mt-1">{formik.errors.tone}</div>
							)}
						</div>

						{/* Category selection field */}
						<div>
							<label htmlFor="category" className="block text-gray-700 text-sm font-semibold mb-2">
								Select Category
							</label>
							<select
								id="category"
								{...formik.getFieldProps('category')}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
								<option value="">Choose a category...</option>
								<option value="technology">Technology</option>
								<option value="health">Health</option>
								<option value="business">Business</option>
								<option value="animal">Animal</option>
							</select>
							{formik.touched.category && formik.errors.category && (
								<div className="text-red-500 mt-1">{formik.errors.category}</div>
							)}
						</div>

						{/* Submit button */}
						<button
							type="submit"
							className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Generate Content
						</button>
						<button
							type="button" // 重要：确保这是一个 button 类型，避免提交表单
							className="w-full mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={goToHistory} // 点击按钮时调用 goToHistory 函数
						>
							View History
						</button>
					</form>

					{/* Display generated content */}
					{generatedContent && (
						<div className="mt-6 p-4 bg-gray-100 rounded-md">
							<h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Content:</h3>
							<p className="text-gray-600">{mutation?.data?.content}</p>
						</div>
					)}
				</div>
			</div>
		);
	}
};

export default AIContentGenerator;
