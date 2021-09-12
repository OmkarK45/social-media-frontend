import { polyfill } from 'interweave-ssr'
polyfill()
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { useApollo } from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { NProgress } from '~/components/ui/NProgress'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import '../styles.css'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const client = useApollo(pageProps.initialClientState)

	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<ApolloProvider client={client}>
			<ThemeProvider storageKey="preferred-theme" attribute="class">
				<DefaultSeo defaultTitle="DogeSocial" titleTemplate="%s | DogeSocial" />
				<NProgress />
				<Toaster position="top-right" />
				{getLayout(<Component {...pageProps} />)}
			</ThemeProvider>
		</ApolloProvider>
	)
}
export default MyApp
