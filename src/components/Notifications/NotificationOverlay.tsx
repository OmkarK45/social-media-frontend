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

interface NotificationOverlayProps extends OverlayProps {}

const NOTIFICATIONS_QUERY = gql`
	query NotificationsQuery($first: Int!, $after: ID) {
		notifications(first: $first, after: $after) {
			edges {
				cursor
				node {
					id
					type
					dispatcher {
						avatar
						firstName
						lastName
						username
					}
					post {
						id
					}
					like {
						avatar
						firstName
						lastName
						username
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
	const [loadNotifications, { data, error, loading, fetchMore }] = useLazyQuery<
		NotificationsQuery,
		NotificationsQueryVariables
	>(NOTIFICATIONS_QUERY, {
		variables: { first: 5, after: null },
	})

	useEffect(() => {
		if (open) loadNotifications()
	}, [open])

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
							return (
								<Notification
									from={notification?.node.dispatcher!}
									id={notification?.node.id!}
									notificationType={
										notification?.node.type! as NotificationType
									}
									postId={notification?.node.post?.id}
									key={notification?.cursor}
								/>
							)
						})}
					</InfiniteScroll>
				) : (
					<ErrorFallback
						noAction
						message="No notifications for now. All caught up!"
					/>
				)}

				<h2 className="text-sm leading-normal pt-8 border-b pb-2 border-gray-300 ">
					YESTERDAY
				</h2>

				<div className="flex items-center justiyf-between">
					<hr className="w-full" />
					<p className="text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">
						Thats it for now :)
					</p>
					<hr className="w-full" />
				</div>
			</div>
		</Overlay>
	)
}
