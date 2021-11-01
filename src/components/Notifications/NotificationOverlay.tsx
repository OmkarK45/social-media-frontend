import { Notification, NotificationType } from './Notification'
import { Overlay, OverlayProps } from '../ui/Overlay'
import { gql, useLazyQuery } from '@apollo/client'
import {
	NotificationsQuery,
	NotificationsQueryVariables,
} from './__generated__/NotificationOverlay.generated'
import { useEffect } from 'react'
import Spinner from '../ui/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'

interface NotificationOverlayProps {
	open: boolean
	setOpen: (prev: boolean) => void
}

const NOTIFICATIONS_QUERY = gql`
	query NotificationsQuery($first: Int!, $after: ID) {
		notifications(first: $first, after: $after) {
			edges {
				cursor
				node {
					isRead
					id
					type
					dispatcher {
						id
						avatar
						firstName
						lastName
						username
					}
					post {
						id
					}
					like {
						id
						post {
							id
						}
						user {
							avatar
							firstName
							lastName
							username
						}
					}
					createdAt
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`

export function NotificationOverlay({
	open,
	setOpen,
}: NotificationOverlayProps) {
	const [loadNotifications, { data, error, fetchMore }] = useLazyQuery<
		NotificationsQuery,
		NotificationsQueryVariables
	>(NOTIFICATIONS_QUERY, {
		variables: { first: 10, after: null },
	})

	useEffect(() => {
		if (open) loadNotifications()
	}, [open])

	if (error)
		return (
			<ErrorFallback
				noAction
				message="We are having trouble fetching notifications."
			/>
		)

	return (
		<Overlay open={open} setOpen={setOpen} overlayTitle="Notifications">
			<div className=" bg-brand-50 dark:bg-gray-800 h-screen overflow-y-auto w-full px-4 absolute right-0">
				{data && data.notifications.edges.length > 0 ? (
					<InfiniteScroll
						hasMore={data?.notifications.pageInfo.hasNextPage}
						next={() => {
							if (fetchMore) {
								fetchMore({
									variables: {
										first: 5,
										after: data?.notifications.pageInfo.endCursor,
									},
								})
							} else {
								loadNotifications({
									variables: { first: 10, after: null },
								})
							}
						}}
						dataLength={data.notifications.edges.length}
						loader={<Spinner className="w-5 h-5" />}
					>
						{data.notifications.edges.map((notification) => {
							const notif = notification?.node
							if (notif) {
								return (
									<Notification
										from={notif.dispatcher!}
										id={notif.id!}
										notificationType={notif.type! as NotificationType}
										postId={notif.post?.id}
										key={notification?.cursor}
										createdAt={notif.createdAt!}
										postLikeId={notif.like?.post?.id}
									/>
								)
							}
						})}
					</InfiniteScroll>
				) : (
					<ErrorFallback
						noAction
						message="No notifications for now. All caught up!"
					/>
				)}
			</div>
		</Overlay>
	)
}
