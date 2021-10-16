import clsx from 'clsx'
import { ReactNode } from 'react'

const BadgeVariants = {
	gray: 'bg-gray-100 text-gray-600',
	green: 'text-green-700 bg-green-200',
	teal: 'text-teal-700 bg-teal-200',
	blue: 'text-blue-700 bg-blue-200',
	indigo: 'text-indigo-700 bg-indigo-200',
	purple: 'text-purple-700 bg-purple-200',
	pink: 'text-pink-700 bg-pink-200',
	red: 'text-red-700 bg-red-200',
	orange: 'text-orange-700 bg-orange-200',
	yellow: 'text-yellow-800 bg-yellow-300',
}

const BadgeSizes = {
	sm: 'px-2 py-0.5 text-xs',
	md: 'px-2 py-1',
}
interface Props {
	variant: keyof typeof BadgeVariants
	size?: keyof typeof BadgeSizes
	children: ReactNode
}

export function Badge({ children, variant, size = 'md' }: Props) {
	return (
		<span
			className={clsx(
				'font-semibold inline-flex leading-4 text-sm rounded-full',
				BadgeVariants[variant],
				size ? BadgeSizes[size] : BadgeSizes['md']
			)}
		>
			{children}
		</span>
	)
}
