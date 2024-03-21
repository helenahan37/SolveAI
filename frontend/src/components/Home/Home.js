/* eslint-disable jsx-a11y/anchor-is-valid */
import HomeFeatures from './HomeFeatures';
import FreeTrial from './FreeTrial';
import background1 from '../../assets/background1.jpg';
import { Link } from 'react-router-dom';
export default function Home() {
	return (
		<>
			<div className="bg-gray-900">
				<div className="relative isolate overflow-hidden pt-14">
					<img src={background1} alt=" ai" className="absolute inset-0 -z-10 h-full w-full object-cover" />
					<div className="absolute inset-0 -z-10 bg-opacity-90"></div>

					<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
						<div className="hidden sm:mb-8 sm:flex sm:justify-center">
							<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
								Announcing SloveAI full release{' '}
								<a href="#" className="font-semibold text-white">
									<span className="absolute inset-0" aria-hidden="true" />
									Read more <span aria-hidden="true">&rarr;</span>
								</a>
							</div>
						</div>
						<div className="text-center">
							<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl"> SolveAI Generator</h1>
							<p className="mt-6 text-lg leading-8 text-gray-300">
								SolveAI is a content generator that uses AI to generate content for you. It is a tool that helps you
								generate content for your blog, website, or social media.
							</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Link
									to="login"
									className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
									Start 3 Day Free Trial
								</Link>
								<Link to="features" className="text-sm font-semibold leading-6 text-white">
									Learn more <span aria-hidden="true">→</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Homepage features */}
			<HomeFeatures />
			{/* Homepage CTA */}
			<FreeTrial />
		</>
	);
}
