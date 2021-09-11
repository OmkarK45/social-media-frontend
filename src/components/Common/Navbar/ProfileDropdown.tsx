import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Avatar } from '~/components/ui/Avatar'

export function ProfileDropdown() {
	return (
		<Menu as="div" className="flex-shrink-0 relative ml-5">
			<div>
				<Menu.Button className="bg-white  rounded-full flex focus:outline-none focus:ring-2  focus:ring-brand-500">
					<Avatar
						rounded
						url="https://res.cloudinary.com/dogecorp/image/upload/v1630858417/dogesocial/v1/images/yca7gfzanqerpzjn4anz.jpg"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-right absolute z-10 dark:bg-gray-700  right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
					{[...Array(20).keys()].map((item, idx) => (
						<Menu.Item key={idx}>
							{({ active }) => (
								<a
									href="#"
									className={clsx(
										active ? 'bg-gray-100 dark:bg-gray-800' : '',
										'block py-2 px-4 text-sm text-gray-700 dark:text-gray-50 '
									)}
								>
									{item}
								</a>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
