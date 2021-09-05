import { gql, useQuery } from '@apollo/client'
import { Button } from '../ui/Button'
import { FeedQuery, FeedQueryVariables } from './__generated__/index.generated'

const FEED_QUERY = gql`
	query FeedQuery($first: Int, $after: ID) {
		feed(first: $first, after: $after) {
			edges {
				cursor
				node {
					image
					id
					user {
						username
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
export function Feed() {
	const { data, error, fetchMore, networkStatus, loading } = useQuery<
		FeedQuery,
		FeedQueryVariables
	>(FEED_QUERY, {
		variables: { first: 5 },
		notifyOnNetworkStatusChange: true,
	})

	if (error) {
		console.log(error.message)
		return <div>An error occurred</div>
	}
	if (loading || !data) return <div>loading</div>

	if (networkStatus === 1) {
		return <div>Loading...</div>
	}
	const isRefetching = networkStatus === 3

	return (
		<div>
			{data?.feed.edges.map((edge) => (
				<div key={edge?.cursor} className="border-t border-b border-white">
					<div>{edge?.node.image}</div>
					<div>{edge?.node.user.username}</div>
				</div>
			))}
			{data?.feed.pageInfo.hasNextPage && (
				<div>
					<Button
						disabled={isRefetching}
						loading={isRefetching}
						onClick={() => {
							fetchMore({
								variables: {
									first: 2,
									after: data.feed.pageInfo.endCursor,
								},
							})
						}}
					>
						Load More
					</Button>
				</div>
			)}
		</div>
	)
}
