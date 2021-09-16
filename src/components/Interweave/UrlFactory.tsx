/**
 * Ref https://github.com/airbnb/lunar/blob/master/packages/core/src/components/Interweave/factories/Url.tsx
 * */

import React from 'react'
import { UrlProps as BaseUrlProps } from 'interweave-autolink'
import { Link } from '../ui/Link'

export function Url({ children, href, url }: BaseUrlProps) {
	let nextUrl = href || url || ''

	if (!url.match(/^https?:\/\//)) {
		nextUrl = `http://${url}`
	}
	// add URL from here to global state. So that we can put the link preview in the bottom
	return (
		<span className="truncate block">
			<Link
				href={nextUrl}
				target="_blank"
				rel="noreferrer noopener"
				className="truncate font-medium dark:text-gray-100 underline focus:outline-none hover:text-opacity-80 focus:ring-2 focus:ring-gray-500"
			>
				{children}
			</Link>
		</span>
	)
}
