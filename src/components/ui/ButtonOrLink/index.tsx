/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

import { ComponentPropsWithRef, forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface Styles {
	ignoreStyles?: boolean
	fullWidth?: boolean
	rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
	className?: string
}

export type ButtonOrLinkProps = ComponentPropsWithRef<'button'> &
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

ButtonOrLink.displayName = 'ButtonOrLink'
export default ButtonOrLink
