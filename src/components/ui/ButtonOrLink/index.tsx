import { ComponentPropsWithRef, forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// TODO : look into this
export const variants = {
	default: {
		base: 'flex items-center justify-center p-3 tracking-wide font-bold border-none outline-none transition duration-150 ease-in-out focus:outline-none disabled:opacity-60 disabled:pointer-events-none',
		active:
			'text-white bg-black focus:bg-opacity-80 hover:bg-opacity-80 active:bg-gray-800',
		inactive:
			'text-black bg-white focus:bg-gray-100 hover:bg-gray-100 active:bg-gray-200',
	},
	purple: {
		base: 'flex items-center justify-center p-3 tracking-wide font-bold border-none outline-none transition duration-150 ease-in-out focus:outline-none disabled:opacity-60 disabled:pointer-events-none',
		active:
			'text-white bg-violet-900 focus:bg-opacity-80 hover:bg-opacity-80 active:bg-violet-800',
		inactive:
			'text-purple-700 bg-purple-200 hover:bg-purple-300 active:bg-purple-400 active:text-white focus-visible:bg-purple-300 focus-visible:ring focus-visible:ring-purple-600',
	},
}

interface Styles {
	ignoreStyles?: boolean
	variant?: keyof typeof variants
	active?: boolean
	fullWidth?: boolean
	rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
	className?: string
}

type ButtonOrLinkProps = ComponentPropsWithRef<'button'> &
	ComponentPropsWithRef<'a'> &
	Styles

export interface Props extends ButtonOrLinkProps {
	preserveRedirect?: boolean
}

const ButtonOrLink = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
	({ href, preserveRedirect, ...props }, ref) => {
		const router = useRouter()
		const isLink = typeof href !== 'undefined'
		const ButtonOrLink = isLink ? 'a' : 'button'

		const content = <ButtonOrLink ref={ref} {...props} />

		if (isLink) {
			const finalHref =
				preserveRedirect && router.query.redirect
					? `${href!}?redirect=${encodeURIComponent(
							router.query.redirect as string
					  )}`
					: href!

			return <Link href={finalHref}>{content}</Link>
		}

		return content
	}
)

export default ButtonOrLink
