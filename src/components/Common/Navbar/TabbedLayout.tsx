import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'
import { IconType } from 'react-icons/lib'
import { useState } from 'react'

interface Navigation {
	name: string
	icon: IconType | React.ElementType
	component: React.ReactNode
	id: string
}

interface TabbedLayoutProps {
	navigation: Array<Navigation>
	isTabbed: boolean
}

export function TabbedLayout({ navigation }: TabbedLayoutProps) {
	const router = useRouter()

	const [currentPath, setCurrentPath] = useState(
		router.isReady ? router.pathname : '/all'
	)

	function handleChange(idx: number) {
		const path = navigation[idx].id
		setCurrentPath(path)
		router.push(path, undefined, {
			shallow: true,
		})
	}

	return (
		<Tab.Group
			defaultIndex={navigation.findIndex((x) => x.id === currentPath)}
			onChange={(idx) => handleChange(idx)}
			vertical
		>
			<aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
				<nav
					aria-label="Sidebar"
					className="sticky top-20 divide-y divide-gray-300"
				>
					<div className="pb-8 space-y-1">
						<Tab.List className="space-y-2">
							{navigation.map((item, index) => {
								const Icon = item.icon
								return (
									<Tab
										key={index + 10}
										className={({ selected }) =>
											clsx(
												selected
													? 'bg-brand-800 text-white dark:bg-brand-700 dark:text-white'
													: 'text-gray-600 hover:text-white hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-gray-100',
												'group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full '
											)
										}
									>
										{({ selected }) => (
											<span className="truncate flex items-center">
												<Icon
													className={clsx(
														selected
															? 'text-white'
															: 'text-gray-400 group-hover:text-white dark:group-hover:text-white',
														'flex-shrink-0 mr-3 h-6 w-6'
													)}
												/>
												<p>{item.name}</p>
											</span>
										)}
									</Tab>
								)
							})}
						</Tab.List>
					</div>
				</nav>
			</aside>
			<Tab.Panels className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
				{navigation.map((panel, index) => {
					return <Tab.Panel key={index}>{panel.component}</Tab.Panel>
				})}
			</Tab.Panels>
		</Tab.Group>
	)
}
