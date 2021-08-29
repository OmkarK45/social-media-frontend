import clsx from 'clsx'
import React from 'react'

interface CardProps {
	noPadding?: boolean
	children: React.ReactNode
	className?: string
	container?: boolean
	rounded?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Card({
	noPadding = false,
	children,
	container = true,
	rounded = 'sm',
	className,
}: CardProps) {
	return (
		<div
			className={clsx(
				'bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 ',
				noPadding ? 'p-0' : 'px-4 py-3',
				container ? 'mx-auto' : '',
				rounded && `rounded-${rounded}`,
				className
			)}
		>
			{children}
		</div>
	)
}
