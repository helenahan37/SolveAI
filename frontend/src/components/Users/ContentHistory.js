import React, { useState } from 'react';
import { getUserProfileAPI } from '../../apis/user/usersAPI';
import { FaTrashAlt, FaEye, FaPlusSquare } from 'react-icons/fa';
import { useQuery, QueryClient, useMutation } from '@tanstack/react-query';
import StatusMessage from '../Alert/statusMessage';
import { Link } from 'react-router-dom';
import history from '../../assets/history.jpg';
import { deleteContentAPI } from '../../apis/user/usersAPI';
const GenerationHistory = () => {
	const { isLoading, data, isError, error, refetch } = useQuery({
		queryFn: getUserProfileAPI,
		queryKey: ['userProfile'],
	});

	const [displayContent, setDisplayContent] = useState({});
	const [showDeletedMessage, setShowDeletedMessage] = useState(false);

	//handle display content
	const handleDisplayContent = (index) => {
		setDisplayContent((prevDisplayContent) => ({
			...prevDisplayContent,
			[index]: !prevDisplayContent[index],
		}));
	};

	// mutation function to delete content
	const deleteContentMutation = useMutation({ mutationFn: deleteContentAPI });

	const handleDeleteContent = async (contentId) => {
		try {
			await deleteContentMutation.mutateAsync(contentId);
			refetch();
			setShowDeletedMessage(true);
			setTimeout(() => setShowDeletedMessage(false), 2000);
		} catch (error) {
			console.error('Failed to delete content:', error);
		}
	};

	if (isLoading) {
		return <StatusMessage type="loading" message="Loading please wait..." />;
	} else if (isError) {
		return <StatusMessage type="error" message={error?.response?.data?.message} />;
	} else {
		return (
			<div
				className="relative isolate overflow-hidden py-24 sm:py-32 bg-gray-900"
				style={{
					backgroundImage: `url(${history})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}>
				<div className="max-w-6xl h-screen mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-extrabold text-white text-center mt-3 mb-6">Generation History</h2>
					<Link
						to="/generate-content"
						className="mb-4 w-48 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 flex items-center">
						<FaPlusSquare className="mr-2" /> Create New Content
					</Link>
					{/* Content history list */}
					{showDeletedMessage && (
						<StatusMessage className="mb-3" type="deletedSuccess" message="Content deleted successfully" />
					)}

					<div className="bg-gradient-to-r from-pink-100 to-indigo-100 shadow rounded-lg mb-3 max-h-[75vh] overflow-y-auto mt-3">
						{data?.user?.contentHistory?.length <= 0 ? (
							<div className="text-black h-auto w-auto opacity-30 text-center text-2xl m-auto py-10">No Content</div>
						) : (
							<ul className="divide-y divide-gray-200">
								{data?.user?.contentHistory?.map((content, index) => {
									return (
										<li key={content._id} className="px-6 py-4 flex items-center justify-between space-x-4">
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-indigo-700 ">{content?.prompt}</p>
												{displayContent[index] && (
													<p className="text-sm font-medium text-gray-900 ">{content?.content}</p>
												)}{' '}
												<p className="text-sm text-gray-500">{new Date(content?.createdAt).toLocaleString()}</p>
											</div>
											<div className="flex items-center space-x-4">
												<FaEye
													onClick={() => handleDisplayContent(index)}
													className="text-green-500 hover:text-green-600 cursor-pointer"
												/>
												<FaTrashAlt
													onClick={() => handleDeleteContent(content._id)}
													className="text-red-500 hover:text-red-600 cursor-pointer"
												/>
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
