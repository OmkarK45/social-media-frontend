import { gql, useQuery } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'next/image'

import { Button } from '~/components/ui/Button'
import { Link } from '~/components/ui/Link'
import { LoadingFallback } from '~/components/ui/Fallbacks/LoadingFallback'
import Spinner from '~/components/ui/Spinner'

import {
	FollowingListQuery,
	FollowingListQueryVariables,
} from './__generated__/Following.generated'
import { FollowButton } from '../FollowButton'

interface FollowingProps {
	username: string
}

const FOLLOWING_LIST_QUERY = gql`
	query FollowingListQuery($username: String!, $first: Int!, $after: ID) {
		seeProfile(username: $username) {
			user {
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

	if (!data) {
		return <div>No data for {username}</div>
	}

	if (data?.seeProfile.user.following.edges.length === 0)
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
						hasMore={data.seeProfile.user.following.pageInfo.hasNextPage}
						next={() => {
							console.log('called')
							fetchMore({
								variables: {
									first: 2,
									after: data.seeProfile.user.following.pageInfo.endCursor,
									username,
								},
							})
						}}
						dataLength={data.seeProfile.user.following.edges.length}
						loader={<LoadingFallback />}
						endMessage={<h1>All done</h1>}
					>
						{data.seeProfile.user.following.edges.map((edge) => {
							const user = edge?.node
							if (!user) return <h1>TODO : No user </h1>
							return (
								<li
									key={edge.cursor}
									className="py-4 px-5 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-lg"
								>
									<div className="flex items-center space-x-4 ">
										<div className="flex-shrink-0">
											<Image
												className="h-10 w-10 rounded-full"
												src={user.avatar!}
												width="40px"
												height="40px"
												alt=""
											/>
										</div>
										<div className="flex-1 min-w-0">
											<Link
												className="no-underline"
												href={`/profile/${user.username}`}
											>
												<p className="text-sm font-medium  truncate">
													{user.firstName + ' ' + user.lastName
														? user.lastName
														: ''}
													OK
												</p>
												<p className="text-sm text-gray-500 truncate">
													{'@' + user.username}
												</p>
												<p className="text-sm truncate pt-1">
													{user.bio ? user.bio : ''}
												</p>
											</Link>
										</div>
										<div>
											{user.isMe ? null : (
												<FollowButton
													variant="white"
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
	)
}
