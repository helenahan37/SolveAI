import React from 'react';
import { getUserProfileAPI } from '../../apis/user/usersAPI';
import { FaTrashAlt, FaEye, FaPlusSquare } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import StatusMessage from '../Alert/statusMessage';
import { Link } from 'react-router-dom';
import history from '../../assets/history.jpg';

const GenerationHistory = () => {
	const { isLoading, data, isError, error } = useQuery({ queryFn: getUserProfileAPI, queryKey: ['userProfile'] });
	console.log(data);
	if (isLoading) {
		return <StatusMessage type="loading" message="Loading please wait..." />;
	} else if (isError) {
		return <StatusMessage type="error" message={error?.response?.data?.message} />;
	} else {
		return (
			<div className="h-fullscreen py-12">
				<img src={history} alt="history-bg" className="absolute inset-0 -z-10 object-cover" />
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-extrabold text-white text-center mb-6">Content Generation History</h2>
					<Link
						to="/generate-content"
						className="mb-4 w-72 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 flex items-center">
						<FaPlusSquare className="mr-2" /> Create New Content
					</Link>
					{/* Content history list */}
					<div className="bg-white shadow overflow-hidden sm:rounded-md">
						{data?.user?.contentHisory?.length <= 0 ? (
							<h1>No Content History</h1>
						) : (
							<ul className="divide-y divide-gray-200">
								{data?.user?.contentHistory?.map((content, index) => {
									return (
										<li className="px-6 py-4 flex items-center justify-between space-x-4">
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-indigo-700 truncate">{content?.prompt}</p>
												<p className="text-sm font-medium text-gray-900 truncate">{content?.content}</p>
												<p className="text-sm text-gray-500">{new Date(content?.createdAt).toLocaleString()}</p>
											</div>
											<div className="flex items-center space-x-4">
												<FaEye className="text-green-500 hover:text-green-600 cursor-pointer" />
												<FaTrashAlt className="text-red-500 hover:text-red-600 cursor-pointer" />
											</div>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
			</div>
		);
	}
};
export default GenerationHistory;
