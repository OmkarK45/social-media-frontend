import clsx from 'clsx'
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../ButtonOrLink'

export interface Props extends ButtonOrLinkProps {
	variant?: 'solid' | 'secondary' | 'white' | 'dark' | 'danger'
	loading?: boolean
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
}

const ButtonSize = {
	xs: 'px-2 py-2 leading-5 text-sm',
	sm: ' px-3 py-2 leading-5 text-sm',
	base: 'px-3 py-1 leading-6',
	lg: 'px-4 py-2 text-base',
	xl: 'px-6 py-3 text-base',
}

// look into brand colors
const ButtonVariants = {
	solid:
		'text-white border-brand-700 bg-brand-700 hover:bg-brand-800 hover:border-brand-800 focus:ring focus:ring-brand-500 focus:ring-opacity-50 active:bg-brand-700 active:border-brand-700',
	secondary:
		'border-pink-200 bg-pink-200 text-pink-700 hover:text-pink-700 hover:bg-pink-300 hover:border-pink-300 focus:ring focus:ring-pink-500 focus:ring-opacity-50 active:bg-pink-200 active:border-pink-200',
	white:
		'border border-gray-300 text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-brand-500',
	dark: 'border border-gray-800 text-gray-100 bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500 active:bg-gray-800',
	danger:
		'text-white bg-red-700 hover:bg-red-800 border border-red-800 focus:outline-none',
	orange: '',
}

export function Button({
	children,
	variant = 'solid',
	loading = false,
	size = 'base',
	rounded,
	fullWidth,
	...props
}: Props) {
	const sizeStyles = ButtonSize[size] || ButtonSize.sm
	const variantStyles = ButtonVariants[variant] || 'solid'

	return (
		<ButtonOrLink
			className={clsx(
				'inline-flex justify-center items-center font-medium shadow-sm focus:outline-none',
				rounded !== 'full' ? sizeStyles : '',
				variantStyles,
				rounded === 'full' ? 'rounded-full p-2' : `rounded-${rounded}`,
				!rounded && 'rounded-md',
				fullWidth && 'w-full'
			)}
			{...props}
		>
			{children}
			{loading && (
				<svg
					className="w-5 h-5 ml-2 fill-current animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path fill="none" d="M0 0h24v24H0z" />
					<path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
				</svg>
			)}
		</ButtonOrLink>
	)
}
