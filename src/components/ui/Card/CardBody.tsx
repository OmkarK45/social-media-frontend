import clsx from 'clsx'
import { ReactNode } from 'react'

interface CardBodyProps {
	children: ReactNode
	noPadding?: boolean
	className?: string
}
export function CardBody({ children, noPadding, className }: CardBodyProps) {
	return (
		<div className={clsx(noPadding ? 'p-0' : 'px-4 py-3', className)}>
			{children}
		</div>
	)
}
