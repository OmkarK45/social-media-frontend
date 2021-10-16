import type { Props as ButtonOrLinkProps } from '../ButtonOrLink'
import ButtonOrLink from '../ButtonOrLink'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {
	ElementType,
	ComponentProps,
	Fragment,
	ReactElement,
	ReactNode,
} from 'react'

type MenuItemProps = ButtonOrLinkProps & {
	icon?: ReactElement
}

export function MenuItem({
	icon,
	className,
	children,
	...props
}: MenuItemProps) {
	const Icon = icon
	return (
		<HeadlessMenu.Item>
			{({ active }) => (
				<ButtonOrLink
					{...props}
					className={clsx(
						active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
						'flex items-center w-full px-4 py-2 text-sm leading-5 text-left'
					)}
				>
					<span className={clsx('flex items-center', className)}>
						{icon && <div className="mr-2 text-lg text-gray-700">{Icon}</div>}
						{children}
					</span>
				</ButtonOrLink>
			)}
		</HeadlessMenu.Item>
	)
}

type Props<T extends ElementType> = ComponentProps<T> & {
	as?: ElementType
	dropdown?: ReactNode
	className?: string
	children?: ReactNode
	position?: 'left' | 'right'
	contentWidth?: boolean
	dropdownClassName?: string
}

export function Menu<TTag extends ElementType<any>>({
	as,
	dropdown,
	children,
	className,
	dropdownClassName,
	...props
}: Props<TTag>) {
	return (
		<div className="flex flex-col relative">
			<HeadlessMenu>
				{({ open }) => (
					<>
						<HeadlessMenu.Button
							as={as}
							className={clsx('focus:outline-none', className)}
							{...props}
						>
							{children}
						</HeadlessMenu.Button>

						<Transition
							show={open}
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<HeadlessMenu.Items
								static
								className={clsx(
									'z-10 overflow-hidden origin-top-right absolute right-5 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
									dropdownClassName
								)}
							>
								{dropdown}
							</HeadlessMenu.Items>
						</Transition>
					</>
				)}
			</HeadlessMenu>
		</div>
	)
}
