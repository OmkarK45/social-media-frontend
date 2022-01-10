import { ApolloClient, from, InMemoryCache, QueryOptions } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useMemo } from 'react'

// @ts-ignore - I promise this exists
declare module 'apollo-upload-client'
// @ts-ignore

import { createUploadLink } from 'apollo-upload-client'

let apolloClient: ApolloClient<any>

interface ClientOptions {
	headers?: Record<string, string>
	initialState?: Record<string, any>
}

export async function preloadQuery(
	context: GetServerSidePropsContext,
	...queries: QueryOptions[]
): Promise<GetServerSidePropsResult<{}>> {
	const client = createApolloClient({
		headers: context.req.headers as Record<string, string>,
	})

	try {
		await Promise.all(queries.map((queryOptions) => client.query(queryOptions)))

		return {
			props: {
				initialClientState: client.cache.extract(),
			},
		}
	} catch (e: any) {
		const notFoundError = e.graphQLErrors.find((error: Error) => {
			return (error as any)?.extensions.code === 404
		})

		if (notFoundError) {
			return {
				notFound: true,
			}
		}

		return { props: {} }
	}
}

export function useApollo(initialState?: Record<string, any>) {
	const client = useMemo(
		() => createApolloClient({ initialState }),
		[initialState]
	)

	return client
}

export function createApolloClient({ initialState, headers }: ClientOptions) {
	let nextClient = apolloClient

	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(({ message, locations, path }) =>
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
				)
			)
		}

		if (networkError) console.log(`[Network error]: ${networkError}`)
	})

	const uploadLink = new createUploadLink({
		uri:
			typeof window === 'undefined'
				? 'http://localhost:3000/api/graphql-micro'
				: '/api/graphql-micro',

		headers,
		credentials: 'include',
	})

	if (!nextClient) {
		nextClient = new ApolloClient({
			ssrMode: typeof window === 'undefined',
			credentials: 'include',
			link: from([errorLink, uploadLink]),
			cache: new InMemoryCache({
				typePolicies: {
					Query: {
						fields: {
							feed: relayStylePagination([]),
							notifications: relayStylePagination(),
							whoToFollow: relayStylePagination(),
							seePost: {
								merge: true,
							},
							seeProfile: {
								merge: true,
							},
							'seeProfile.user.followers': {
								merge: true,
							},
							'seeProfile.posts': relayStylePagination(),
						},
					},
					Post: {
						fields: {
							comments: relayStylePagination([]),
						},
					},
					User: {
						fields: {
							followers: relayStylePagination(),
							following: relayStylePagination(),
							posts: relayStylePagination(),
						},
					},
				},
			}),
		})
	}

	// If your page has Next.js data fetching methods that use Apollo Client,
	// the initial state gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = nextClient.extract()

		// Restore the cache using the data passed from
		// getStaticProps/getServerSideProps combined with the existing cached data
		nextClient.cache.restore({ ...existingCache, ...initialState })
	}

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return nextClient

	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = nextClient

	return nextClient
}
