import '../styles.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { useApollo } from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { NProgress } from '~/components/NProgress'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps.initialClientState)

	return (
		<ApolloProvider client={client}>
			<ThemeProvider storageKey="preferred-theme" attribute="class">
				<DefaultSeo defaultTitle="DogeSocial" titleTemplate="%s | DogeSocial" />
				<NProgress />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	)
}
export default MyApp
