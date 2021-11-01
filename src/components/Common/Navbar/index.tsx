import { Popover } from '@headlessui/react'
import { HiX, HiMenu, HiOutlineBell } from 'react-icons/hi'
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
import { useState } from 'react'
import { NotificationOverlay } from '~/components/Notifications/NotificationOverlay'
import { UnauthorizedHeader } from './UnauthorizedHeader'
import { Logo } from './Logo'

export function Navbar() {
	const [openNotifications, setNotificationOpen] = useState<boolean>(false)

	const { user } = useUser()
	if (!user) {
		return (
			<>
				<UnauthorizedHeader />
			</>
		)
	}
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
									<Logo />
								</div>
							</div>
							<div className="min-w-0 flex-1  lg:px-0 lg:max-w-5xl xl:col-span-6 flex-grow">
								<div className="flex items-center px-6 py-4 md:max-w-5xl md:mx-auto lg:mx-0 xl:px-0">
									<SearchBar />
								</div>
							</div>
							<div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
								{/* Mobile menu button */}
								<button
									onClick={() => setNotificationOpen((prev) => !prev)}
									type="button"
									className="mx-3 ml-auto flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
								>
									<span className="sr-only">View notifications</span>
									<HiOutlineBell className="h-6 w-6" aria-hidden="true" />
								</button>
								<Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500">
									<span className="sr-only">Open menu</span>
									{open ? (
										<HiX className="block h-6 w-6" aria-hidden="true" />
									) : (
										<HiMenu className="block h-6 w-6" aria-hidden="true" />
									)}
								</Popover.Button>
							</div>
							<div className="hidden  lg:flex lg:items-center lg:justify-end xl:col-span-4 space-x-5">
								<ThemeToggle />
								<button
									onClick={() => setNotificationOpen((prev) => !prev)}
									type="button"
									className="ml-auto flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
								>
									<span className="sr-only">View notifications</span>
									<HiOutlineBell className="h-6 w-6" aria-hidden="true" />
								</button>
								{!user ? (
									<Spinner className="w-5 h-5" />
								) : (
									<ProfileDropdown user={user} />
								)}

								<Link href={`/post/new`} className="ml-6 text-sm no-underline">
									<Button size="lg">New Post</Button>
								</Link>
							</div>
						</div>
					</div>
					<NotificationOverlay
						open={openNotifications}
						setOpen={setNotificationOpen}
					/>
					<MobileMenu user={user} open={open} />
				</>
			)}
		</Popover>
	)
}
