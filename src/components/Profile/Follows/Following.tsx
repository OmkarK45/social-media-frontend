import { gql, useQuery } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'

import { LoadingFallback } from '~/components/ui/Fallbacks/LoadingFallback'
import Spinner from '~/components/ui/Spinner'

import {
	FollowingListQuery,
	FollowingListQueryVariables,
} from './__generated__/Following.generated'
import { FollowButton } from '../FollowButton'
import { UserHandle } from '~/components/Common/UserHandle'
import { ErrorFallback } from '~/components/ui/Fallbacks/ErrorFallback'
import { SEO } from '~/components/SEO'

interface FollowingProps {
	username: string
}

const FOLLOWING_LIST_QUERY = gql`
	query FollowingListQuery($username: String!, $first: Int!, $after: ID) {
		seeProfile(username: $username) {
			following(first: $first, after: $after) {
				edges {
					cursor
					node {
						username
						avatar
						firstName
						lastName
						bio
						isMe
						isFollowing
					}
				}
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}
	}
`

export function Following({ username }: FollowingProps) {
	const { data, loading, error, fetchMore } = useQuery<
		FollowingListQuery,
		FollowingListQueryVariables
	>(FOLLOWING_LIST_QUERY, {
		variables: {
			first: 10,
			after: null,
			username,
		},
		fetchPolicy: 'cache-first',
	})

	if (loading) {
		return (
			<div className="py-6">
				<Spinner className="w-6 h-6" />
			</div>
		)
	}

	if (!data || data.seeProfile.following.edges.length === 0)
		return (
			<div className="px-4 py-5 sm:p-6 flex items-start justify-center">
				<h1 className="text-muted font-medium text-center">
					There are no users {username} are followed by.
				</h1>
			</div>
		)

	return (
		<>
			<SEO title={`${username} / Following · DogeSocial`} />
			<div>
				<div className="flow-root">
					<ul role="list" className=" divide-y  divide-gray-600">
						<InfiniteScroll
							hasMore={data.seeProfile.following.pageInfo.hasNextPage}
							next={() => {
								fetchMore({
									variables: {
										first: 10,
										after: data.seeProfile.following.pageInfo.endCursor,
										username,
									},
								})
							}}
							dataLength={data.seeProfile.following.edges.length}
							loader={<LoadingFallback />}
						>
							{data.seeProfile.following.edges.map((edge) => {
								const user = edge?.node
								if (!user) return <h1>TODO : No user </h1>
								return (
									<li
										key={edge.cursor}
										className="py-4 px-5 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-lg"
									>
										<div className="flex items-center space-x-4 ">
											<UserHandle user={user} />
											<div>
												{user.isMe ? null : (
													<FollowButton
														variant="dark"
														isFollowing={user.isFollowing}
														username={user.username}
													/>
												)}
											</div>
										</div>
									</li>
								)
							})}
						</InfiniteScroll>
					</ul>
				</div>
			</div>
		</>
	)
}
