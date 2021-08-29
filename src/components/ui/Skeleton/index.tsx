import clsx from 'clsx'

const variants = {
	gray: 'bg-gray-500',
}

interface Props {
	variant?: keyof typeof variants
	spaceY?: string
	h?: string
	rows?: number
	width?: '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 'full'
}

const Skeleton = ({
	variant = 'gray',
	spaceY = 'space-y-2',
	h = 'h-6',
	rows = 1,
	width = '1/2',
}: Props) => {
	return (
		<div
			className={clsx(
				'py-2 animate-pulse flex flex-col',
				spaceY,
				width && `w-${width}`
			)}
		>
			{[...Array(rows).keys()].map((_, i) => {
				return (
					<div
						className={clsx('bg-opacity-25 rounded-lg', h, variants[variant])}
					></div>
				)
			})}
		</div>
	)
}

export default Skeleton
