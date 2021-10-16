import { gql, useQuery } from '@apollo/client'
import { HiOutlineCubeTransparent } from 'react-icons/hi'
import { FollowButton } from '~/components/Profile/FollowButton'
import { Card } from '~/components/ui/Card'
import { ErrorFallback } from '~/components/ui/Fallbacks/ErrorFallback'
import { LoadingFallback } from '~/components/ui/Fallbacks/LoadingFallback'
import { Heading } from '~/components/ui/Heading'
import { Link } from '~/components/ui/Link'
import { Footer } from '../Footer'
import {
	WhoToFollowQuery,
	WhoToFollowQueryVariables,
} from './__generated__/RightSidebar.generated'

const whoToFollow = [
	{
		name: 'Leonard Krasner',
		handle: 'leonardkrasner',
		href: '#',
		imageUrl:
			'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	// More people...
]

export const WHO_TO_FOLLOW_QUERY = gql`
	query WhoToFollowQuery($first: Int!, $after: ID) {
		whoToFollow(first: $first, after: $after) {
			edges {
				node {
					id
					avatar
					username
					firstName
					lastName
					isFollowing
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`

export function RightSidebar() {
	const { data, loading, error, refetch } = useQuery<
		WhoToFollowQuery,
		WhoToFollowQueryVariables
	>(WHO_TO_FOLLOW_QUERY, {
		variables: {
			first: 4,
			after: null,
		},
	})

	if (error || !data) {
		return (
			<aside className="w-full sticky top-20">
				<ErrorFallback
					message="Failed to load suggestions."
					action={() =>
						refetch({
							after: null,
							first: 4,
						})
					}
					buttonText="Retry"
				/>
			</aside>
		)
	}

	if (loading) return <LoadingFallback />

	if (data.whoToFollow.edges.length === 0) {
		return (
			<>
				<Card rounded="lg" className="sticky top-20">
					<ErrorFallback
						message="No user suggestions for now. :)"
						noAction
						icon={
							<HiOutlineCubeTransparent className="h-12 w-12 text-gray-500" />
						}
					/>
				</Card>
				<Footer />
			</>
		)
	}

	return (
		<aside className="w-full sticky top-20">
			<div className=" space-y-4">
				<section aria-labelledby="who-to-follow-heading">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow">
						<div className="p-6">
							<Heading
								size="h5"
								className="text-base font-medium text-gray-900"
							>
								Who to follow
							</Heading>
							<div className="mt-6 flow-root">
								<ul
									role="list"
									className="-my-4 divide-y divide-gray-200 dark:divide-gray-700"
								>
									{data.whoToFollow.edges.map((edge) => {
										const user = edge?.node
										return (
											<li
												key={user?.id}
												className="flex items-center py-4 space-x-3"
											>
												<div className="flex-shrink-0">
													<img
														className="h-8 w-8 rounded-full"
														src={user?.avatar!}
														alt=""
													/>
												</div>
												<div className="min-w-0 flex-1">
													<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
														<Link
															className="no-underline"
															href={`/profile/${user?.username}`}
														>
															{user?.firstName + ' '}
															{user?.lastName ? user?.lastName : null}
														</Link>
													</p>
													<p className="text-sm text-gray-500 dark:text-gray-400">
														<a href={user?.username}>@{user?.username}</a>
													</p>
												</div>
												<div className="flex-shrink-0">
													<FollowButton
														variant="dark"
														isFollowing={user?.isFollowing!}
														username={user?.username!}
													/>
												</div>
											</li>
										)
									})}
								</ul>
							</div>
							<div className="mt-6">
								<a
									href="#"
									className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
								>
									View all
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</aside>
	)
}
