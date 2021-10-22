import { gql, useQuery } from '@apollo/client'
import { User } from '~/__generated__/schema.generated'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import Spinner from '../ui/Spinner'
import {
	UserPopoverQuery,
	UserPopoverQueryVariables,
} from './__generated__/index.generated'

interface UserProfileTooltipProps {
	username: string
}

const USER_POPOVER_QUERY = gql`
	query UserPopoverQuery($username: String!) {
		seeProfile(username: $username) {
			user {
				id
				avatar
				firstName
				lastName
				username
				stats {
					followersCount
					followingCount
					postsCount
				}
			}
		}
	}
`
export function UserProfilePopover({ username }: UserProfileTooltipProps) {
	const { data, loading, error } = useQuery<
		UserPopoverQuery,
		UserPopoverQueryVariables
	>(USER_POPOVER_QUERY, {
		variables: {
			username,
		},
		fetchPolicy: 'no-cache',
	})

	if (!data || loading)
		return (
			<Card
				rounded="lg"
				className="flex items-center min-w-md z-40 shadow-lg bg-white justify-center  "
			>
				<div className="max-w-md py-6 px-6 dark:bg-gray-800 rounded">
					<div className="mx-auto">
						<Spinner className="w-5 h-5" />
					</div>
				</div>
			</Card>
		)
	if (error) return <ErrorFallback message="Failed to load user data." />
	const user = data.seeProfile.user
	return (
		<Card
			rounded="lg"
			className="flex items-center min-w-md z-40 shadow-lg bg-white justify-center  "
		>
			<div className="max-w-md py-6 px-6 dark:bg-gray-800 rounded">
				<img
					className="w-16 h-16 rounded-full shadow"
					src={user.avatar!}
					alt="profile"
				/>
				<p className="text-xl font-semibold leading-tight mt-2.5 text-gray-800 dark:text-gray-100">
					{user.firstName} &nbsp; {user.lastName ?? null}
				</p>
				<p className="text-sm leading-3 mt-2 text-muted dark:text-gray-400">
					@{user.username}
				</p>
				<div className="mt-4 space-y-4">
					<div className="flex items-center">
						<div>
							<p className="text-xl font-semibold leading-tight text-muted">
								{user.stats.followersCount}
							</p>
							<p className="text-sm leading-3 mt-2 text-gray-500 dark:text-gray-400">
								Followers
							</p>
						</div>
						<div className="ml-11">
							<p className="text-xl font-semibold leading-tight  text-blue-600">
								{user.stats.postsCount}
							</p>
							<p className="text-sm leading-3 mt-2 text-gray-500 dark:text-gray-400">
								Posts
							</p>
						</div>
					</div>
					<Button fullWidth>View Profile</Button>
				</div>
				{/* <div className="mx-auto">
					<Spinner className="w-5 h-5" />
				</div> */}
			</div>
		</Card>
	)
}
