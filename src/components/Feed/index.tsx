import { gql, useQuery } from '@apollo/client'
import { FeedQuery, FeedQueryVariables } from './__generated__/index.generated'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Card } from '../ui/Card'
import Spinner from '../ui/Spinner'
import { HiCheckCircle } from 'react-icons/hi'
import GradientBar from '../ui/GradientBar'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { RightSidebar } from '../Common/Navbar/RightSidebar'

const FEED_QUERY = gql`
	query FeedQuery($first: Int, $after: ID) {
		feed(first: $first, after: $after) {
			edges {
				cursor
				node {
					image
					id
					caption
					user {
						username
						firstName
					}
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`
let count = 0
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
	if (!data) return <div>loading</div>
	count = count + 1
	return (
		<main className="lg:col-span-7 xl:col-span-6 lg:grid lg:grid-cols-12 lg:gap-3">
			<div className="bg-white dark:bg-gray-800 px-4 py-6 shadow sm:p-6 sm:rounded-lg lg:col-span-12">
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
					endMessage={
						<Card
							rounded="lg"
							className="bg-gray-50 dark:bg-gray-700 mt-2 overflow-hidden"
						>
							<GradientBar color="pink" />
							<div className="px-4 py-3">
								<div className="flex flex-col items-center justify-center">
									<HiCheckCircle className="w-10 h-10 mb-1 text-brand-500" />
									<p className="font-medium ">You&apos;re All Caught Up ! </p>
								</div>
							</div>
						</Card>
					}
				>
					{data?.feed.edges.map((edge) => (
						<li key={edge?.cursor} className="border-t border-b border-white">
							<p>{edge?.node.user.firstName}</p>
							<p className="text-muted">@{edge?.node.user.username}</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
								tenetur explicabo rem molestias deleniti necessitatibus, fuga
								nihil, est nostrum tempore accusamus eveniet accusantium quaerat
								cumque illum laborum excepturi, officiis quos. Cumque obcaecati
								assumenda deleniti odio vero commodi quas beatae.
							</p>
						</li>
					))}
				</InfiniteScroll>
			</div>
		</main>
	)
}
