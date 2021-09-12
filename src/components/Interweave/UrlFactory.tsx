/**
 * Ref https://github.com/airbnb/lunar/blob/master/packages/core/src/components/Interweave/factories/Url.tsx
 * */

import React from 'react'
import { UrlProps as BaseUrlProps } from 'interweave-autolink'
import { Link } from '../ui/Link'
import { LinkPreview } from '../ui/LinkPreview'

export function Url({ children, href, url }: BaseUrlProps) {
	let nextUrl = href || url || ''

	if (!url.match(/^https?:\/\//)) {
		nextUrl = `http://${url}`
	}
	// add URL from here to global state. So that we can put the link preview in the bottom
	return (
		<div>
			<Link href={nextUrl} target="_blank" rel="noreferrer noopener">
				{children}
			</Link>
			<LinkPreview url={nextUrl} />
		</div>
	)
}
