import { Popover, Transition } from '@headlessui/react'
import { HiOutlineSparkles } from 'react-icons/hi'
import { Button } from '~/components/ui/Button'
import { Link } from '~/components/ui/Link'
import { User } from '~/__generated__/schema.generated'

interface MobileMenuProps {
	open: boolean
	user: Partial<User>
}
type TLink = {
	href: (username: string) => string
	label: string
	icon: React.ElementType
}

export const links: TLink[] = [
	{
		href: (username) => `/profile/${username}`,
		label: 'Your Profile',
		icon: HiOutlineSparkles,
	},
]

export function MobileMenu({ open, user }: MobileMenuProps) {
	return (
		<Transition
			show={open}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
				<div className="border-t border-gray-200 pt-4 pb-3 mt-16">
					<div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
						<div className="flex-shrink-0">
							<img
								className="h-10 w-10 rounded-full"
								src={user.avatar!}
								alt=""
							/>
						</div>
						<div className="ml-3">
							<div className="text-base font-medium text-gray-800 dark:text-gray-100">
								Hi! {user.firstName}
							</div>
						</div>
					</div>
					<div className="mt-3 px-2 space-y-1">
						{links.map((link, idx) => {
							const Icon = link.icon
							return (
								<Link
									key={idx}
									href={link.href(user.username!)}
									className="flex no-underline px-3 py-2 rounded-md text-base text-gray-400 hover:text-white hover:bg-gray-700"
								>
									<span className="space-x-2 flex">
										<Icon className="h-6 w-6" /> <span>Your Profile</span>
									</span>
								</Link>
							)
						})}
					</div>
					<div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
						<Button className="mt-2" fullWidth href="#" size="lg">
							New Post
						</Button>
					</div>
				</div>
			</Popover.Panel>
		</Transition>
	)
}
