import clsx from 'clsx'
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../ButtonOrLink'

export interface Props extends ButtonOrLinkProps {
	className?: string
}

export function Link({ className, ...props }: Props) {
	return (
		<ButtonOrLink
			className={clsx(
				'font-medium dark:text-gray-100 underline focus:outline-none hover:text-opacity-80 focus:ring-2 focus:ring-gray-500',
				className
			)}
			{...props}
		/>
	)
}
