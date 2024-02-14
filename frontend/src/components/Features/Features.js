import { AcademicCapIcon, PuzzlePieceIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';
import bg1 from '../../assets/bg1.jpg';

const features = [
	{
		name: 'AI-Powered Content Creation',
		description:
			'SolveAI revolutionizes the way you create content. Our intelligent algorithms generate high-quality, engaging material, saving you time and enhancing your creative output.',
		href: '/',
		icon: AcademicCapIcon,
	},
	{
		name: 'Customizable for Your Needs',
		description:
			'Whether it’s blog posts, marketing copy, or creative stories, SolveAI tailors content to your specific needs, ensuring each piece is perfectly suited for its purpose.',
		href: '/',
		icon: PuzzlePieceIcon,
	},
	{
		name: 'Streamline Your Workflow',
		description:
			'Integrating seamlessly with various platforms, SolveAI becomes a natural extension of your workflow, making content generation more efficient than ever before.',
		href: '/',
		icon: HandThumbUpIcon,
	},
];

export default function AppFeatures() {
	return (
		<div
			className="relative isolate overflow-hidden py-24 sm:py-32 bg-gray-900"
			style={{
				backgroundImage: `url(${bg1})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="text-base font-semibold leading-7 text-indigo-400">AI-Powered Content Creation</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Revolutionizing Your Content Strategy
					</p>
					<p className="mt-6 text-lg leading-8 text-gray-300">
						Experience the power of AI with SolveAI, an intelligent content generator powered by OpenAI that provides
						high-quality, engaging content tailored specifically for you. Streamline your workflow and elevate your
						creative output with content that truly resonates.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
						{features.map((feature) => (
							<div
								key={feature.name}
								className="flex flex-col rounded-lg bg-white/10 backdrop-blur-sm p-6 ring-1 ring-inset ring-white/10">
								<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
									<feature.icon className="h-6 w-6 flex-none text-indigo-400" aria-hidden="true" />
									{feature.name}
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
									<p className="flex-auto">{feature.description}</p>
									<a href={feature.href} className="mt-6 text-sm font-semibold leading-6 text-indigo-400">
										Learn more <span aria-hidden="true">→</span>
									</a>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
