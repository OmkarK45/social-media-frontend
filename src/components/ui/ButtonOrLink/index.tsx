import { ComponentPropsWithRef, forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface Styles {
	ignoreStyles?: boolean
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
