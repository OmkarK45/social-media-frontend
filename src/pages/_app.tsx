import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { useApollo } from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { NProgress } from '~/components/ui/NProgress'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import '../styles.css'

function MyApp({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps.initialClientState)

	return (
		<ApolloProvider client={client}>
			<ThemeProvider storageKey="preferred-theme" attribute="class">
				<DefaultSeo defaultTitle="DogeSocial" titleTemplate="%s | DogeSocial" />
				<NProgress />
				<Toaster position="top-right" />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	)
}
export default MyApp
