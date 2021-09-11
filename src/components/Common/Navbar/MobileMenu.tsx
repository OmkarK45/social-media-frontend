import { Popover, Transition } from '@headlessui/react'
import { Button } from '~/components/ui/Button'

interface MobileMenuProps {
	open: boolean
}

export function MobileMenu({ open }: MobileMenuProps) {
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
								src="https://placekitten.com/150/150"
								alt=""
							/>
						</div>
						<div className="ml-3">
							<div className="text-base font-medium text-gray-800 dark:text-gray-100">
								Demo User
							</div>
							<div className="text-sm font-medium text-gray-500">
								demo_account@gmail.com
							</div>
						</div>
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
