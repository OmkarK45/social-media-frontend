import { gql, useQuery } from '@apollo/client'
import { HiCheckCircle } from 'react-icons/hi'
import InfiniteScroll from 'react-infinite-scroll-component'

import { FeedQuery, FeedQueryVariables } from './__generated__/index.generated'

import { Card } from '~/components/ui/Card'
import { GradientBar } from '~/components/ui/GradientBar'
import { LoadingFallback } from '~/components/ui/Fallbacks/LoadingFallback'
import { FeedPostCard } from '../Post/FeedPostCard'
import { ErrorFallback } from '~/components/ui/Fallbacks/ErrorFallback'
import { WhoToFollow } from './WhoToFollow'
import useInView from 'react-cool-inview'

const FEED_QUERY = gql`
	query FeedQuery($after: ID) {
		feed(first: 10, after: $after) {
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

export function Feed() {
	const { data, error, fetchMore } = useQuery<FeedQuery, FeedQueryVariables>(
		FEED_QUERY,
		{
			fetchPolicy: 'cache-first',
			nextFetchPolicy: 'cache-first',
		}
	)

	if (error) {
		return (
			<ErrorFallback
				action={() => {}}
				message="Failed to fetch Feed for you. Try reloading."
			/>
		)
	}
	if (!data) {
		return <h1></h1>
	}

	function handleNext() {
		fetchMore({
			variables: {
				first: 10,
				after: data?.feed.pageInfo.endCursor,
			},
		})
	}
	console.log(data.feed.edges.length)
	const length = data.feed.edges.length

	return (
		<main className="lg:col-span-7 xl:col-span-6 lg:grid lg:grid-cols-12 lg:gap-3">
			<div className="px-4 lg:col-span-12 -mt-3">
				<InfiniteScroll
					hasMore={data.feed.pageInfo.hasNextPage}
					next={handleNext}
					dataLength={length}
					loader={<LoadingFallback />}
					endMessage={<EndMessage />}
				>
					{data.feed.edges.map((edge, index) => {
						return <FeedPostCard post={edge?.node!} key={edge?.cursor} />
					})}
				</InfiniteScroll>
			</div>
		</main>
	)
}

function EndMessage() {
	return (
		<Card
			rounded="lg"
			className="bg-white max-w-2xl dark:bg-gray-700 mt-2 overflow-hidden"
		>
			<GradientBar color="pink" />
			<div className="px-4 py-3">
				<div className="flex flex-col items-center justify-center">
					<HiCheckCircle className="w-10 h-10 mb-1 text-brand-500" />
					<p className="font-medium ">You&apos;re All Caught Up ! </p>
				</div>
			</div>
		</Card>
	)
}
