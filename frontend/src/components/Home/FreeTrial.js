import { Link } from 'react-router-dom';

export default function FreeTrial() {
	return (
		<div className="relative isolate overflow-hidden bg-black">
			<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Boost your productivity.
						<br />
						Start using our app today.
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
						Boost your productivity with SolveAI Generator. Start using our app today.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							to="/register"
							className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
							Start 3 Day Free Trial
						</Link>
						<Link to="features" className="text-sm font-semibold leading-6 text-white">
							Learn more <span aria-hidden="true">→</span>
						</Link>
					</div>
				</div>
			</div>
			<svg
				viewBox="0 0 1024 1024"
				className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
				aria-hidden="true">
				<circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
				<defs>
					<radialGradient id="gradient" cx="50%" cy="50%" r="50%">
						<stop offset="0.33" stopColor="#7775D6" />
						<stop offset="0.66" stopColor="#E935C1" />
					</radialGradient>
				</defs>
			</svg>
		</div>
	);
}
