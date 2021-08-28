import { forwardRef } from 'react'
import clsx from 'clsx'
import ButtonOrLink, {
	Props as ButtonOrLinkProps,
	variants,
} from '../ButtonOrLink'

const Button = forwardRef<
	HTMLButtonElement & HTMLAnchorElement,
	ButtonOrLinkProps
>(
	(
		{
			ignoreStyles = false,
			variant = 'default',
			active = false,
			fullWidth = false,
			rounded = '2xl',
			className,
			...props
		},
		ref
	) => {
		const styles = variants[variant] || variants.default

		if (ignoreStyles) {
			return <ButtonOrLink type="button" className={className} {...props} />
		}

		return (
			<ButtonOrLink
				type="button"
				className={clsx(
					styles.base,
					active ? styles.active : styles.inactive,
					`rounded-${rounded}`,
					fullWidth && 'w-full',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)

export default Button
