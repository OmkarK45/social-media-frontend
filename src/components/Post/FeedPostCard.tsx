/* eslint-disable @next/next/no-img-element */
import {
	HiHeart,
	HiOutlineChat,
	HiOutlineHeart,
	HiOutlineReply,
	HiOutlineShare,
	HiOutlineThumbUp,
} from 'react-icons/hi'
import { Card } from '~/components/ui/Card'
import { Image } from '~/components/ui/Image'
import { Link } from '~/components/ui/Link'
import { Interweave } from '../Interweave'
import { ReplyModal } from './ReplyModal'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
	ToggleLikeMutation,
	ToggleLikeMutationVariables,
} from './__generated__/FeedPostCard.generated'
import clsx from 'clsx'
import { Button } from '../ui/Button'

export interface FeedPostCardProps {
	id: string
	createdAt: Date | string
	updatedAt: Date | string
	gifImage: string | null
	image: string | null
	caption: string | null
	blurHash: string | null
	user: {
		avatar: string | null
		firstName: string
		lastName: string | null
		username: string
	}

	likes: number
	totalComments: number
	isMine: boolean
	isLiked: boolean
}

// TODO : keep these in one file
export const TOGGLE_LIKE_MUTATION = gql`
	mutation ToggleLikeMutation($id: String!) {
		toggleLike(id: $id) {
			success
		}
	}
`

export function FeedPostCard(props: FeedPostCardProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const [toggleLike] = useMutation<
		ToggleLikeMutation,
		ToggleLikeMutationVariables
	>(TOGGLE_LIKE_MUTATION, {
		update: (cache, result) => {
			if (!result.data?.toggleLike.success) return

			cache.modify({
				id: `Post:${props.id}`,
				fields: {
					isLiked(prev) {
						return !prev
					},
					likes(prev) {
						if (props.isLiked) {
							return prev - 1
						}
						return prev + 1
					},
				},
			})
		},
	})

	return (
		<Card noPadding className="max-w-2xl bg-white my-3 sm:rounded-lg">
			<article>
				<div className="px-6 py-4">
					<div className="flex space-x-3">
						<div className="flex-shrink-0">
							<img
								className="h-10 w-10 rounded-full"
								src={
									props.user.avatar ??
									'https://res.cloudinary.com/dogecorp/image/upload/v1631712574/dogesocial/v1/images/1_oi7c6m.svg'
								}
								alt=""
							/>
						</div>
						<div className="min-w-0 flex-1">
							<p className="text-sm font-medium ">
								<a href="#" className="hover:underline">
									{props.user.firstName + ' ' + props.user.lastName ?? ''}
									<span className="text-muted text-sm ml-2">
										@{props.user.username}
									</span>
								</a>
							</p>
							<p className="text-sm text-gray-500">
								<a href="#" className="hover:underline">
									<time dateTime="2020-12-09T11:43:00">
										December 9 at 11:43 AM
									</time>
								</a>
							</p>
						</div>
					</div>
				</div>

				{/* GIF */}
				{/* <div className="mx-auto w-11/12 rounded-lg overflow-hidden">
					<img
						className="w-full"
						src="https://media4.giphy.com/media/8Iv5lqKwKsZ2g/giphy.gif?cid=621ab156bo1wrbfwp11t84w3nan2wxi78cqd03ia4ijvp3iu&rid=giphy.gif&ct=g"
					/>
				</div> */}

				{/* Image */}
				<div className="mx-auto w-11/12 rounded-lg overflow-hidden">
					<Image
						alt="TODO"
						width="700px"
						height="350px"
						objectFit="cover"
						blurHash="UG5##AkCROf6.Aj[Riay%hoLV@ayx^jZV@ay"
						src="http://res.cloudinary.com/dogecorp/image/upload/v1631192257/dogesocial/v1/images/e7jpyiortr4aljxpatnv.jpg"
					/>
				</div>

				{/* Caption */}
				<div className="px-6 mt-4">
					<p className=" space-y-4 dark:text-gray-300">
						<Interweave content={props.caption} />
					</p>
					<Link href={`/post/${props.id}`}>Read More</Link>
				</div>

				{/* Post Actions */}
				<div className="py-4 px-6 flex justify-between space-x-8">
					<div className="flex space-x-6">
						<span className="inline-flex items-center space-x-2  ">
							<Button
								variant="dark"
								onClick={async () => {
									await toggleLike({
										variables: {
											id: props.id,
										},
									})
								}}
								className="rounded-full overflow-hidden space-x-2"
							>
								{props.isLiked ? (
									<HiHeart className="w-5 h-5 text-brand-700" />
								) : (
									<HiOutlineHeart className="w-5 h-5" />
								)}
								<p>{props.likes}</p>
							</Button>
						</span>
						<span className="inline-flex items-center space-x-2">
							<Button
								variant="dark"
								onClick={() => setIsOpen(true)}
								className="space-x-2"
							>
								<HiOutlineReply className="w-5 h-5" />
								<p>{props.totalComments}</p>
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
