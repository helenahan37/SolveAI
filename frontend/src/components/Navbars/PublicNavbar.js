import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../../assets/logo.png';

const navigation = [
	{ name: 'Home', to: '/' },
	{ name: 'Features', to: '/features' },
	{ name: 'Pricing', to: '/plans' },
	{ name: 'About', to: '/about' },
];

export default function PublicNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<div className="bg-gray-800 border-b border-gray-700 shadow-md">
				<header className="absolute inset-x-0 top-0 z-50">
					<nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
						<div className="flex lg:flex-1">
							{/* Logo */}
							<Link to="/">
								<img src={logo} alt="Logo" p-4 style={{ height: '70px', width: '100px' }} />
							</Link>
						</div>
						<div className="flex lg:hidden">
							<button
								type="button"
								className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
								onClick={() => setMobileMenuOpen(true)}>
								<span className="sr-only">Open main menu</span>
								<Bars3Icon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div className="hidden lg:flex lg:gap-x-12">
							{navigation.map((item) => (
								<Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-white">
									{item.name}
								</Link>
							))}
						</div>
						<div className="hidden lg:flex lg:flex-1 lg:justify-end">
							<Link to="/login" className="text-sm font-semibold leading-6 text-white">
								Log in <span aria-hidden="true">&rarr;</span>
							</Link>
						</div>
					</nav>
					<Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
						<div className="fixed inset-0 z-50" />
						<Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
							<div className="flex items-center justify-between">
								<a href="/" className="-m-1.5 p-1.5">
									<span className="sr-only">SolveAI</span>
									<img className="h-8 w-auto" src={logo} alt="" />
								</a>
								<button
									type="button"
									className="-m-2.5 rounded-md p-2.5 text-gray-400"
									onClick={() => setMobileMenuOpen(false)}>
									<span className="sr-only">Close menu</span>
									<XMarkIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
							<div className="mt-6 flow-root">
								<div className="-my-6 divide-y divide-gray-500/25">
									<div className="space-y-2 py-6">
										{navigation.map((item) => (
											<Link
												onClick={() => setMobileMenuOpen(false)}
												key={item.name}
												to={item.to}
												className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800">
												{item.name}
											</Link>
										))}
									</div>
									<div className="py-6">
										<Link
											onClick={() => setMobileMenuOpen(false)}
											to="/login"
											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
											Log in
										</Link>
									</div>
								</div>
							</div>
						</Dialog.Panel>
					</Dialog>
				</header>
			</div>
		</>
	);
}
