import { ReactNode } from 'react'

interface CardFooterProps {
	children: ReactNode
}

export function CardFooter({ children }: CardFooterProps) {
	return (
		<footer className="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50 dark:bg-gray-600">
			{children}
		</footer>
	)
}
