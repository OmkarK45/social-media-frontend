import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { Button } from '~/components/ui/Button'
import { GradientBar } from '~/components/ui/GradientBar'
import { Heading } from '~/components/ui/Heading'
import { Link } from '~/components/ui/Link'
import { Logo } from './Logo'

export function UnauthorizedHeader() {
	return (
		<div>
			<header>
				<GradientBar
					color="pink"
					size="md"
					className="fixed max-w-full top-0 z-10"
				/>
				<Popover className="relative">
					<div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-4 lg:px-0 md:justify-start md:space-x-10 ">
						<div className="flex justify-start lg:w-0 lg:flex-1">
							<div className="flex items-center space-x-4">
								<Logo /> <Heading size="h5">DogeSocial</Heading>
							</div>
						</div>
						<div className="-mr-2 -my-2 md:hidden">
							<Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500">
								<span className="sr-only">Open menu</span>
								<HiOutlineMenu className="h-6 w-6" aria-hidden="true" />
							</Popover.Button>
						</div>

						<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
							<Link
								href="/auth/signin"
								className="whitespace-nowrap no-underline text-base font-medium text-gray-500 hover:text-gray-900"
							>
								Sign in
							</Link>
							<Button size="lg" href="/auth/signup" className="ml-8">
								Sign up
							</Button>
						</div>
					</div>

					<Transition
						as={Fragment}
						enter="duration-200 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							className="absolute bg-white dark:bg-gray-800 z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
						>
							<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5  divide-y-2 divide-gray-50">
								<div className="pt-5 pb-6 ">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<Logo /> <Heading size="h5">DogeSocial</Heading>
										</div>
										<div className="-mr-2">
											<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500">
												<span className="sr-only">Close menu</span>
												<HiOutlineX className="h-6 w-6" aria-hidden="true" />
											</Popover.Button>
										</div>
									</div>
								</div>
								<div className="py-6 px-5">
									<div>
										<Button size="lg" href="/auth/signup" fullWidth>
											Sign up
										</Button>
										<p className="mt-6 text-center text-base font-medium text-gray-500">
											Existing user?{' '}
											<Link
												href="/auth/signin"
												className="text-gray-900 no-underline"
											>
												Sign in
											</Link>
										</p>
									</div>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</header>
		</div>
	)
}
