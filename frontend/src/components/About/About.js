import React from 'react';
import { UserPlusIcon, ChartBarIcon, CogIcon } from '@heroicons/react/20/solid';
import background from '../../assets/background.jpg';

const cards = [
	{
		name: 'Personalized Content Creation',
		description:
			'Leverage the power of AI to generate content that resonates with your audience. Our technology tailors content to match user preferences and historical data, ensuring high engagement and relevance.',
		icon: UserPlusIcon,
	},
	{
		name: 'Scalability and Flexibility',
		description:
			'Our platform is designed to grow with you, offering scalable solutions that adapt to your content needs. Whether you’re a solo blogger or a large enterprise, we provide the flexibility to support your content generation at any scale.',
		icon: ChartBarIcon,
	},
	{
		name: 'Real-time Content Optimization',
		description:
			"Our AI doesn't just create; it learns and optimizes. By analyzing real-time data and feedback, our platform continuously improves the quality and relevance of the generated content, ensuring your message is always on point.",
		icon: CogIcon,
	},
];

export default function AboutUs() {
	return (
		<div className="relative isolate overflow-hidden py-24  h-screen w-full sm:py-32 ">
			<img src={background} alt=" ai" className="absolute inset-0 -z-10  object-cover" />
			<div className="absolute inset-0 -z-10 bg-opacity-90"></div>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
						SolveAI - Revolutionizing Content Generation
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-300">
						SolveAI is at the forefront of content creation innovation. Leveraging advanced AI algorithms, we empower
						creators to effortlessly produce compelling, high-quality content tailored to their unique needs.
					</p>
				</div>
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
					{cards.map((card) => (
						<div key={card.name} className="flex gap-x-4 rounded-xl bg-white/10 p-6 ring-1 ring-inset ring-white/10">
							<card.icon className="h-7 w-5 flex-none text-indigo-400" aria-hidden="true" />
							<div className="text-base leading-7">
								<h3 className="font-semibold text-white">{card.name}</h3>
								<p className="mt-2 text-gray-300">{card.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
