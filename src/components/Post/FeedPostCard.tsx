/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
	HiHeart,
	HiOutlineHeart,
	HiOutlineReply,
	HiOutlineShare,
} from 'react-icons/hi'
import { format } from 'date-fns'

import { Card } from '~/components/ui/Card'
import { Interweave } from '../Interweave'
import { ReplyModal } from './ReplyModal'
import { Button } from '../ui/Button'
import {
	ToggleLikeMutation,
	ToggleLikeMutationVariables,
} from './__generated__/FeedPostCard.generated'
import { Link } from '~/components/ui/Link'
import { PostDropdown } from './PostDropdown'
import NextImage from 'next/image'
import { Post } from '~/__generated__/schema.generated'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'

type DeepPartial<T> = {
	[propertyKey in keyof T]?: DeepPartial<T[propertyKey]>
}
export interface Props {
	post: DeepPartial<Post>
}
export const TOGGLE_LIKE_MUTATION = gql`
	mutation ToggleLikeMutation($id: String!) {
		toggleLike(id: $id) {
			success
		}
	}
`

export function FeedPostCard(props: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [likesCount, setLikesCount] = useState<number>(
		props.post.likes?.totalCount as number
	)
	const [hasLiked, setHasLiked] = useState<boolean>(
		props.post.isLiked as boolean
	)

	const [toggleLike] = useMutation<
		ToggleLikeMutation,
		ToggleLikeMutationVariables
	>(TOGGLE_LIKE_MUTATION, {
		onCompleted: () => {
			setHasLiked(!hasLiked)
			setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1)
		},
	})

	if (!props.post || !props.post.user) {
		return <ErrorFallback message="Failed to load" />
	}

	return (
		<Card
			noPadding
			className="max-w-2xl overflow-hidden bg-white my-3 sm:rounded-lg"
		>
			<article>
				<div className="px-6 py-4">
					<div className="flex space-x-3">
						<div className="flex-shrink-0">
							<img
								className="h-10 w-10 rounded-full"
								src={props.post.user.avatar!}
								alt=""
							/>
						</div>
						<div className="min-w-0 flex-1">
							<Link
								href={`/profile/${props.post.user.username}`}
								className="no-underline"
							>
								<p className="text-sm font-medium ">
									{props.post?.user?.firstName}{' '}
									{props.post?.user?.lastName
										? props.post?.user?.lastName
										: null}
									<span className="text-muted text-sm ml-2">
										@{props.post?.user?.username}
									</span>
								</p>
							</Link>
							<p className="text-sm text-gray-500">
								<a href="#" className="hover:underline">
									<time dateTime="2020-12-09T11:43:00">
										{format(
											new Date(props.post.createdAt!),
											'MMMM d, hh:mm aaa'
										)}
									</time>
								</a>
							</p>
						</div>
						<div className="flex-shrink-0 self-center flex">
							<PostDropdown
								id={props.post.id!}
								isMine={props.post.isMine!}
								caption={props.post.caption ?? ''}
								gifLink={props.post.gifImage ?? ''}
							/>
						</div>
					</div>
				</div>

				{/* GIF */}

				<Link
					href={`/post/${props.post.id}`}
					className="mt-1 block no-underline font-normal outline-none focus:outline-none focus:ring-0"
				>
					{props.post.gifImage && (
						<div className="mx-auto w-11/12 rounded-lg overflow-hidden">
							<img className="w-full" src={props.post.gifImage} />
						</div>
					)}

					{props.post.image && (
						<div className="mx-auto w-11/12 rounded-lg overflow-hidden ">
							<div className="aspect-w-1 aspect-h-1">
								<NextImage
									src={props.post.image}
									layout="fill"
									objectFit="cover"
									placeholder="empty"
								/>
							</div>
						</div>
					)}

					{/* Caption */}

					<div className="px-6 my-2 pb-2 ">
						<p className=" space-y-4 dark:text-gray-300">
							<Interweave content={props.post.caption} />
						</p>
					</div>
				</Link>
				{/* Post Actions */}
				<div className="py-2 px-6 bg-gray-50 dark:bg-gray-900/30 flex border-t border-gray-200 dark:border-gray-700 justify-between space-x-8">
					<div className="flex space-x-6">
						<span className="inline-flex items-center space-x-2  ">
							<Button
								variant="dark"
								onClick={async () => {
									await toggleLike({
										variables: {
											id: props.post.id!,
										},
									})
								}}
								className="rounded-full overflow-hidden space-x-2"
							>
								{hasLiked ? (
									<HiHeart className="w-5 h-5 text-brand-700" />
								) : (
									<HiOutlineHeart className="w-5 h-5" />
								)}
								<p>{likesCount}</p>
							</Button>
						</span>
						<span className="inline-flex items-center space-x-2">
							<Button
								variant="dark"
								onClick={() => setIsOpen(true)}
								className="space-x-2"
							>
								<HiOutlineReply className="w-5 h-5" />
								<p>{props.post.comments?.totalCount}</p>
							</Button>
							<ReplyModal
								isOpen={isOpen}
								onClose={() => setIsOpen(false)}
								{...props}
							/>
						</span>
					</div>
					<div>
						<span className="inline-flex items-center space-x-2  ">
							<Button variant="dark">
								<HiOutlineShare className="w-6 h-6 " />
							</Button>
						</span>
					</div>
				</div>
			</article>
		</Card>
	)
}
