import { HiHeart, HiOutlineReply, HiOutlineUserAdd } from 'react-icons/hi'
import { User } from '~/__generated__/schema.generated'
import Link from 'next/link'
import { formatDistance } from 'date-fns'
import * as React from 'react'

export type NotificationType = 'USER_FOLLOW' | 'POST_LIKE' | 'POST_REPLY'

interface NotificationProps {
	/** ID of the notification */
	id: string
	/** Link of profile which triggered */
	from: Pick<User, 'username' | 'firstName' | 'lastName' | 'avatar'>
	/** Type of notification */
	notificationType: NotificationType
	/** ID of post */
	postId?: string | null
	createdAt: string
	postLikeId?: string | null
}

const NOTIFICATION_ICON: Record<NotificationType, React.ReactNode> = {
	USER_FOLLOW: <HiOutlineUserAdd className="text-gray-500" />,
	POST_LIKE: <HiHeart className="text-red-600" />,
	POST_REPLY: <HiOutlineReply className="text-gray-500" />,
}

const NOTIFICATION_STRING: Record<NotificationType, string> = {
	USER_FOLLOW: 'followed you!',
	POST_LIKE: 'liked your',
	POST_REPLY: 'replied to your',
}

export function Notification({
	from,
	notificationType,
	postId,
	createdAt,
	postLikeId,
}: NotificationProps) {
	return (
		<div className="w-full p-3 mt-4 bg-white dark:bg-gray-700 rounded shadow flex flex-shrink-0">
			<div className="w-8 h-8 border rounded-full  border-gray-200 dark:border-gray-500 flex flex-shrink-0 items-center justify-center">
				{NOTIFICATION_ICON[notificationType]}
			</div>
			<div className="pl-3 w-full">
				<div className="flex items-center justify-between w-full">
					<p className="text-sm leading-none">
						<span className="text-indigo-700 dark:text-indigo-100">
							<Link href={`/profile/${from.username}`}>{from.firstName}</Link>
						</span>{' '}
						{NOTIFICATION_STRING[notificationType]}{' '}
						{notificationType === 'POST_REPLY' && (
							<Link href={`/post/${postId}`}>post</Link>
						)}
						{notificationType === 'POST_LIKE' && (
							<a href={`/post/${postLikeId}`}>post</a>
						)}
					</p>
				</div>
				<p className="text-xs leading-3 pt-1 text-gray-500">
					{formatDistance(new Date(createdAt), new Date(), {
						addSuffix: true,
					})}
				</p>
			</div>
		</div>
	)
}
