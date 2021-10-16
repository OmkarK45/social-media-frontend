import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'

import { Button } from '../ui/Button'
import { Props as ButtonProps } from '../ui/Button'
import {
	FollowUserMutation,
	FollowUserMutationVariables,
	UnfollowUserMutation,
	UnfollowUserMutationVariables,
} from './__generated__/FollowButton.generated'

interface FollowButtonProps extends ButtonProps {
	/** Name of the user to be followed or unfollowed */
	username: string
	/** Is currently followed by me */
	isFollowing: boolean
}

const FOLLOW_USER_MUTATION = gql`
	mutation FollowUserMutation($input: FollowUserInput!) {
		followUser(input: $input) {
			ok
		}
	}
`

const UNFOLLOW_USER_MUTATION = gql`
	mutation UnfollowUserMutation($input: FollowUserInput!) {
		unfollowUser(input: $input) {
			ok
		}
	}
`

export function FollowButton({
	username,
	isFollowing,
	id,
	...props
}: FollowButtonProps) {
	const [following, setIsFollowing] = useState<boolean>(isFollowing)

	// ṭhe cache update here does not work for some reason

	const [followUser, { loading: followLoading }] = useMutation<
		FollowUserMutation,
		FollowUserMutationVariables
	>(FOLLOW_USER_MUTATION, {
		update(cache) {
			cache.modify({
				id: `User:${id}`,
				fields: {
					stats(existingStats) {
						return {
							...existingStats,
							followersCount: existingStats.followersCount + 1,
						}
					},
				},
			})
		},
	})

	const [unfollowUser, { loading: unfollowLoading }] = useMutation<
		UnfollowUserMutation,
		UnfollowUserMutationVariables
	>(UNFOLLOW_USER_MUTATION, {
		update(cache) {
			cache.modify({
				id: `User:${id}`,
				fields: {
					stats(stats) {
						return {
							...stats,
							followersCount: stats.followersCount - 1,
						}
					},
				},
			})
		},
	})

	return (
		<Button
			loading={followLoading || unfollowLoading}
			onClick={() => {
				if (following) {
					unfollowUser({
						variables: { input: { username } },
					})
					setIsFollowing(false)
				}
				if (!following) {
					followUser({
						variables: { input: { username } },
					})
					setIsFollowing(true)
				}
			}}
			{...props}
		>
			{following ? 'Unfollow' : 'Follow'}
		</Button>
	)
}
