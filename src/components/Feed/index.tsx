import { gql, useQuery } from '@apollo/client'
import { FeedQuery, FeedQueryVariables } from './__generated__/index.generated'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Card } from '../ui/Card'
import { HiCheckCircle } from 'react-icons/hi'
import GradientBar from '../ui/GradientBar'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { FeedPostCard } from '../Post/FeedPostCard'

const FEED_QUERY = gql`
	query FeedQuery($first: Int, $after: ID) {
		feed(first: $first, after: $after) {
			edges {
				cursor
				node {
					image
					id
					caption
					blurHash
					likes
					totalComments
					gifImage
					isMine
					isLiked
					user {
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
			variables: { first: 5, after: null },
			notifyOnNetworkStatusChange: true,
			fetchPolicy: 'cache-first',
		}
	)

	if (error) {
		console.log(error.message)
		return <div>An error occurred</div>
	}
	if (!data) return <div>TODO</div>

	return (
		<main className="lg:col-span-7 xl:col-span-6 lg:grid lg:grid-cols-12 lg:gap-3">
			<div className=" px-4 lg:col-span-12 -mt-3">
				<InfiniteScroll
					hasMore={data.feed.pageInfo.hasNextPage}
					next={() => {
						fetchMore({
							variables: {
								first: 5,
								after: data.feed.pageInfo.endCursor,
							},
						})
					}}
					dataLength={data.feed.edges.length}
					loader={<LoadingFallback />}
					endMessage={<EndMessage />}
				>
					{data?.feed.edges.map((edge) => {
						const data = edge?.node
						if (data) {
							return (
								<div key={edge?.cursor}>
									<FeedPostCard {...data} />
								</div>
							)
						}
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
