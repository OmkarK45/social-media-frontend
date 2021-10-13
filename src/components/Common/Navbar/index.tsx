import { Popover } from '@headlessui/react'
import { HiX, HiMenu } from 'react-icons/hi'
import clsx from 'clsx'

import { GradientBar } from '~/components/ui/GradientBar'
import { Button } from '~/components/ui/Button'
import { ThemeToggle } from '~/components/ThemeSwitcher'
import { Link } from '~/components/ui/Link'

import { SearchBar } from './SearchBar'
import { ProfileDropdown } from './ProfileDropdown'
import { MobileMenu } from './MobileMenu'
import { useUser } from '~/utils/useUser'
import Spinner from '~/components/ui/Spinner'

export function Navbar() {
	const { user } = useUser()
	return (
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
					<div className="bg-white/70 dark:bg-gray-900/40 backdrop-blur-md px-4 sm:px-6 lg:px-8 fixed top-0.5 z-10 w-full">
						<div className="mx-auto max-w-7xl relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
							<div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
								<div className="flex-shrink-0 flex items-center">
									<Link href="/">
										<svg
											className="hi-solid hi-cube-transparent inline-block w-10 h-10 text-brand-600"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
												clipRule="evenodd"
											/>
										</svg>
									</Link>
								</div>
							</div>
							<div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
								<div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
									<SearchBar />
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
							<div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 space-x-5">
								<ThemeToggle />

								{!user ? (
									<Spinner className="w-5 h-5" />
								) : (
									<ProfileDropdown avatarSrc={user.avatar!} />
								)}

								<Link href={`/post/new`} className="ml-6 text-sm no-underline">
									<Button size="lg">New Post</Button>
								</Link>
							</div>
						</div>
					</div>

					<MobileMenu open={open} />
				</>
			)}
		</Popover>
	)
}
