import {
	ApolloClient,
	from,
	HttpLink,
	InMemoryCache,
	QueryOptions,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { relayStylePagination } from '@apollo/client/utilities'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useMemo } from 'react'
import { API_URL } from './config'
import { createUploadLink } from 'apollo-upload-client'

let apolloClient: ApolloClient<any>

interface ClientOptions {
	headers?: Record<string, string>
	initialState?: Record<string, any>
}

export const preloadQuery = async (
	context: GetServerSidePropsContext,
	...queries: QueryOptions[]
): Promise<GetServerSidePropsResult<{}>> => {
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
		const notFoundError = e.graphQLErrors.find(
			(error: Error) => (error as any)?.extensions.code === 404
		)

		if (notFoundError) {
			return {
				notFound: true,
			}
		}

		return { props: {} }
	}
}

export const useApollo = (initialState?: Record<string, any>) => {
	const client = useMemo(
		() => createApolloClient({ initialState }),
		[initialState]
	)

	return client
}

export const createApolloClient = ({
	initialState,
	headers,
}: ClientOptions) => {
	const ssrMode = typeof window === 'undefined'
	let nextClient = apolloClient

	const httpLink = new HttpLink({
		uri: ssrMode ? 'http://localhost:5000/graphql' : API_URL,
		headers: headers,
		credentials: 'include',
	})

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
		uri: ssrMode ? 'http://localhost:5000/graphql' : API_URL,
		headers: headers,
		credentials: 'include',
	})

	if (!nextClient) {
		nextClient = new ApolloClient({
			ssrMode,
			link: from([errorLink, uploadLink]),
			cache: new InMemoryCache({
				typePolicies: {
					Query: {
						fields: {
							feed: relayStylePagination(),
							notifications: relayStylePagination(),
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

	if (initialState) {
		const existingCache = nextClient.extract()
		nextClient.cache.restore({ ...existingCache, ...initialState })
	}

	if (ssrMode) return nextClient
	if (!apolloClient) apolloClient = nextClient

	return nextClient
}
