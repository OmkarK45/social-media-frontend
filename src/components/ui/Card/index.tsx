import clsx from 'clsx'
import React from 'react'
import { CardBody } from './CardBody'
import { CardFooter } from './CardFooter'

interface CardProps {
	noPadding?: boolean
	children: React.ReactNode
	className?: string
	container?: boolean
	rounded?: 'sm' | 'md' | 'lg' | 'xl'
	shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
}

export function Card({
	children,
	container = true,
	rounded = 'sm',
	shadow = 'none',
	className,
}: CardProps) {
	return (
		<div
			className={clsx(
				'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 ',
				container ? 'mx-auto' : '',
				rounded && `rounded-${rounded}`,
				shadow !== 'none' && `shadow-${shadow}`,
				className
			)}
		>
			{children}
		</div>
	)
}

Card.Body = CardBody
Card.Footer = CardFooter
