import Head from 'next/head'
import React from 'react'

interface Props {
	title: string
	description?: string
	path?: string
	image?: string
	cardType?: 'summary_large_image' | 'summary'
}
export const BASE_URL = process.env.BASE_URL

export const SEO: React.FC<Props> = ({
	title,
	description,
	path,
	image = `/images/og/logo.png`,
	cardType = 'summary',
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />

			<meta property="og:url" content={`${BASE_URL}${path}`} />
			<meta property="og:site_name" content="DogeSocial" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />

			<meta property="twitter:card" content={cardType} />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image:src" content={image} />
		</Head>
	)
}
