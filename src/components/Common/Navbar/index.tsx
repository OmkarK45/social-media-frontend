import { Popover } from '@headlessui/react'
import { HiOutlineSearch, HiX, HiMenu } from 'react-icons/hi'

import clsx from 'clsx'

import GradientBar from '~/components/ui/GradientBar'
import { Button } from '~/components/ui/Button'
import { ProfileDropdown } from './ProfileDropdown'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
	return (
		<>
			{/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
			<Popover
				as="header"
				className={({ open }) =>
					clsx(
						open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
						'bg-white dark:bg-gray-900 shadow-sm lg:static lg:overflow-y-visible'
					)
				}
			>
				{({ open }) => (
					<>
						<GradientBar
							color="pink"
							size="sm"
							className="fixed max-w-full top-0 z-10"
						/>
						<div className="bg-white dark:bg-gray-900  px-4 sm:px-6 lg:px-8 fixed top-0.5 z-10 w-full">
							<div className="mx-auto max-w-7xl relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
								<div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
									<div className="flex-shrink-0 flex items-center">
										<a href="#">
											<img
												className="block h-8 w-auto"
												src="https://tailwindui.com/img/logos/workflow-mark.svg?color=pink&shade=600"
												alt="Workflow"
											/>
										</a>
									</div>
								</div>
								<div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
									<div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
										<div className="w-full">
											<label htmlFor="search" className="sr-only">
												Search
											</label>
											<div className="relative">
												<div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
													<HiOutlineSearch
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</div>

												<input
													id="search"
													name="search"
													className="block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
													placeholder="TODO"
													type="search"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
									{/* Mobile menu button */}
									<Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500">
										<span className="sr-only">Open menu</span>
										{open ? (
											<HiX className="block h-6 w-6" aria-hidden="true" />
										) : (
											<HiMenu className="block h-6 w-6" aria-hidden="true" />
										)}
									</Popover.Button>
								</div>
								<div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
									{/* Profile dropdown */}
									<ProfileDropdown />

									<Button size="lg" href="#" className="ml-6 text-sm">
										New Post
									</Button>
								</div>
							</div>
						</div>

						<MobileMenu open={open} />
					</>
				)}
			</Popover>
		</>
	)
}
