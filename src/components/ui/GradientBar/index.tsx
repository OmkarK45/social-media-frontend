import clsx from 'clsx'

const colors = {
	blue: 'from-indigo-500 to-teal-200 bg-teal-200',
	pink: 'from-purple-400 to-pink-400 bg-pink-400',
	indigo: 'from-indigo-500 to-red-500',
}

const sizes = {
	sm: 'h-0.5',
	md: 'h-1',
	lg: 'h-2',
}
type Props = {
	color?: keyof typeof colors
	size?: keyof typeof sizes
	className?: string
}

export function GradientBar({ color = 'blue', size = 'md', className }: Props) {
	return (
		<div
			className={clsx(
				'w-full bg-gradient-to-r',
				colors[color],
				sizes[size],
				className
			)}
		/>
	)
}
