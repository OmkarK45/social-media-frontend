import { useQuery } from '@apollo/client'
import { HiOutlineCubeTransparent } from 'react-icons/hi'

import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'
import { WHO_TO_FOLLOW_QUERY } from '../Common/Navbar/RightSidebar'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { Link } from '../ui/Link'
import { FollowButton } from '../Profile/FollowButton'

import {
	WhoToFollowQuery,
	WhoToFollowQueryVariables,
} from '../Common/Navbar/__generated__/RightSidebar.generated'

export function WhoToFollow() {
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
			</>
		)
	}

	return (
		<Card className="max-w-2xl" rounded="lg">
			<Card.Body>
				<Heading size="h5">Who To Follow</Heading>
			</Card.Body>
			<Card.Body noPadding className="px-4 pb-4">
				<div
					className="flex overflow-x-auto space-x-4 px-1 who-to-follow"
					style={{
						WebkitOverflowScrolling: 'touch',
					}}
				>
					{data.whoToFollow.edges.map((edge) => {
						const person = edge?.node
						return (
							<div
								key={person?.id}
								className="flex-shrink-0 relative rounded-lg border dark:border-gray-600 border-gray-300 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500"
							>
								<div className="space-y-3">
									<div className="flex-shrink-0 ">
										<img
											className="h-12 w-12 rounded-full mx-auto"
											src={person?.avatar!}
											alt=""
										/>
									</div>
									<div className="flex-1 min-w-0">
										<Link
											href={`/profile/${person?.username}`}
											className="focus:outline-none no-underline"
										>
											<p className="text-sm font-medium ">
												{person?.firstName}
											</p>
											<p className="text-sm text-gray-500  truncate">
												@{person?.username}
											</p>
										</Link>
									</div>
									<FollowButton
										isFollowing={false}
										username={person?.username!}
										fullWidth
									>
										Follow
									</FollowButton>
								</div>
							</div>
						)
					})}
				</div>
			</Card.Body>
		</Card>
	)
}
