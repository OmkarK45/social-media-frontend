import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Card } from '../ui/Card'

import { gql, useQuery } from '@apollo/client'
import {
	UserPostsQuery,
	UserPostsQueryVariables,
} from './__generated__/UserPosts.generated'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { FeedPostCard } from '../Post/FeedPostCard'
import { Badge } from '../ui/Badge'

const USER_POSTS_QUERY = gql`
	query UserPostsQuery($username: String!, $first: Int!, $after: ID) {
		seeProfile(username: $username) {
			user {
				posts(username: $username, first: $first, after: $after) {
					edges {
						node {
							id
							createdAt
							updatedAt
							gifImage
							image
							isLiked
							caption
							blurHash
							totalComments
							likes
							isMine
							user {
								avatar
								firstName
								lastName
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
		}
	}
`

export function UserPosts({
	username,
	count,
}: {
	username: string
	count: number
}) {
	const { data, loading, error, fetchMore } = useQuery<
		UserPostsQuery,
		UserPostsQueryVariables
	>(USER_POSTS_QUERY, {
		variables: {
			first: 5,
			after: null,
			username,
		},
	})

	if (!data) return <div>TODO : No data</div>

	if (error) return <div>Something failed.</div>

	return (
		<Tab.Group>
			<Card.Body
				className="mt-5 max-w-2xl z-10 sticky top-0  bg-white dark:bg-gray-800 rounded-md overflow-hidden"
				noPadding
			>
				<Tab.List
					className="-mb-px  border-b border-gray-600 "
					aria-label="Tabs"
				>
					<Tab
						className={({ selected }) =>
							clsx(
								selected
									? 'border-brand-500 text-brand-600'
									: 'border-transparent text-gray-500 hover:text-brand-700 hover:border-brand-700',
								'w-1/4 py-4 px-1 text-center border-b-2  font-medium text-sm flex-1'
							)
						}
					>
						<p className="text-base font-medium">
							Posts <Badge variant="pink"> {count}</Badge>
						</p>
					</Tab>
				</Tab.List>
			</Card.Body>
			<Tab.Panels>
				<Tab.Panel className="flex">
					<InfiniteScroll
						hasMore={data.seeProfile.user.posts.pageInfo.hasNextPage}
						next={() => {
							fetchMore({
								variables: {
									first: 10,
									after: data.seeProfile.user.posts.pageInfo.endCursor,
									username,
								},
							})
						}}
						dataLength={data.seeProfile.user.posts.edges.length}
						loader={<LoadingFallback />}
						endMessage={<>ALL DONE</>}
					>
						{data.seeProfile.user.posts.edges.map((edge) => {
							const data = edge?.node
							if (data) {
								return (
									<div key={edge.node.id}>
										<FeedPostCard {...data} />
									</div>
								)
							}
						})}
					</InfiniteScroll>
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	)
}
