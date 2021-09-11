import clsx from 'clsx'
import { ReactNode } from 'react'

interface CardFooterProps {
	children: ReactNode
	className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
	return (
		<footer
			className={clsx(
				'py-4 px-5 lg:px-6 w-full text-sm bg-gray-100 dark:bg-gray-700 overflow-hidden',
				className
			)}
		>
			{children}
		</footer>
	)
}
