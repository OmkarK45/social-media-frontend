import { gql, useQuery } from '@apollo/client'
import { Button } from '~/components/ui/Button'
import Image from 'next/image'
import Spinner from '~/components/ui/Spinner'
import {
	FollowersListQuery,
	FollowersListQueryVariables,
} from './__generated__/Followers.generated'
import { Link } from '~/components/ui/Link'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LoadingFallback } from '~/components/ui/Fallbacks/LoadingFallback'
import { FollowButton } from '../FollowButton'
import { UserHandle } from '~/components/Common/UserHandle'

interface FollowersProps {
	username: string
}

const FOLLOWERS_LIST_QUERY = gql`
	query FollowersListQuery($username: String!, $first: Int!, $after: ID) {
		seeProfile(username: $username) {
			user {
				followers(first: $first, after: $after) {
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
	}
`

export function Followers({ username }: FollowersProps) {
	const { data, loading, error, fetchMore } = useQuery<
		FollowersListQuery,
		FollowersListQueryVariables
	>(FOLLOWERS_LIST_QUERY, {
		variables: {
			first: 10,
			after: null,
			username,
		},
		fetchPolicy: 'cache-first',
	})

	if (!data) {
		return <LoadingFallback />
	}

	if (data.seeProfile.user.followers.edges.length === 0)
		return (
			<div className="px-4 py-5 sm:p-6 flex items-start justify-center">
				<h1 className="text-muted font-medium text-center">
					There are no users {username} are followed by.
				</h1>
			</div>
		)

	if (loading) {
		return (
			<div className="py-6">
				<Spinner className="w-6 h-6" />
			</div>
		)
	}

	return (
		<div>
			<div className="flow-root">
				<ul role="list" className=" divide-y  divide-gray-600">
					<InfiniteScroll
						hasMore={data.seeProfile.user.followers.pageInfo.hasNextPage}
						next={() => {
							console.log('called')
							fetchMore({
								variables: {
									first: 2,
									after: data.seeProfile.user.followers.pageInfo.endCursor,
									username,
								},
							})
						}}
						dataLength={data.seeProfile.user.followers.edges.length}
						loader={<LoadingFallback />}
						endMessage={<h1>All done</h1>}
					>
						{data.seeProfile.user.followers.edges.map((edge) => {
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
													isFollowing={user.isFollowing}
													username={user.username}
													variant="dark"
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
	)
}
