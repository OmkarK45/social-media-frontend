import { gql, useQuery } from '@apollo/client'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { EndMessage } from '.'
import { FeedPostCard } from '../Post/FeedPostCard'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import {
	PopularPostsQuery,
	PopularPostsQueryVariables,
} from './__generated__/PopularPosts.generated'

export const POPULAR_POSTS = gql`
	query PopularPostsQuery($after: ID, $orderBy: String!) {
		popularPosts(after: $after, orderBy: $orderBy) {
			edges {
				cursor
				node {
					image
					id
					caption
					blurHash
					likes {
						totalCount
					}
					comments {
						totalCount
					}
					gifImage
					isMine
					isLiked
					user {
						id
						username
						firstName
						avatar
						lastName
					}
					createdAt
					updatedAt
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`

export function PopularPostsFeed() {
	const { data, error, loading, fetchMore } = useQuery<
		PopularPostsQuery,
		PopularPostsQueryVariables
	>(POPULAR_POSTS, {
		variables: {
			orderBy: 'desc',
			after: null,
		},
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first',
	})

	if (error) {
		return (
			<ErrorFallback
				action={() => {}}
				message="Failed to fetch Feed for you. Try reloading."
			/>
		)
	}
	if (!data) {
		return (
			<ErrorFallback
				noAction
				message="Some error occured while fetching feed."
			/>
		)
	}

	function handleNext() {
		fetchMore({
			variables: {
				first: 10,
				after: data?.popularPosts.pageInfo.endCursor,
			},
		})
	}

	const length = data.popularPosts.edges.length

	return (
		<main className="lg:col-span-7 xl:col-span-6 lg:grid lg:grid-cols-12 lg:gap-3">
			<div className="px-4 lg:col-span-12 -mt-3">
				<InfiniteScroll
					hasMore={data.popularPosts.pageInfo.hasNextPage}
					next={handleNext}
					dataLength={length}
					loader={<LoadingFallback />}
					endMessage={<EndMessage />}
				>
					{data.popularPosts.edges.map((edge, index) => {
						return <FeedPostCard post={edge?.node!} key={edge?.cursor} />
					})}
				</InfiniteScroll>
			</div>
		</main>
	)
}
