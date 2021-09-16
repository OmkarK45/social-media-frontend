/* eslint-disable @next/next/no-img-element */
import {
	HiHeart,
	HiOutlineHeart,
	HiOutlineReply,
	HiOutlineShare,
} from 'react-icons/hi'
import { z } from 'zod'

import { Interweave } from '../Interweave'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { Image } from '../ui/Image'
import { TextArea } from '../ui/TextArea'
import { Comments } from './Comments'
import { gql, useMutation, useQuery } from '@apollo/client'
import { CREATE_COMMENT_MUTATION } from './ReplyModal'
import {
	CreateCommentMutation,
	CreateCommentMutationVariables,
} from './__generated__/ReplyModal.generated'
import { useRouter } from 'next/router'
import {
	PostQuery,
	PostQueryVariables,
} from './__generated__/PostCard.generated'
import { ProfilePageJsonLd } from 'next-seo'
import toast from 'react-hot-toast'
import { format, formatDistance } from 'date-fns'
import { TOGGLE_LIKE_MUTATION } from './FeedPostCard'
import {
	ToggleLikeMutation,
	ToggleLikeMutationVariables,
} from './__generated__/FeedPostCard.generated'

export const CommentSchema = z.object({
	body: z.string().min(1, 'Comment must be atleast 1 character long.'),
})

export const POST_QUERY = gql`
	query PostQuery($id: String!) {
		seePost(id: $id) {
			id
			caption
			image
			blurHash
			gifImage
			totalComments
			isMine
			isLiked
			createdAt
			updatedAt
			user {
				username
				avatar
			}
			likes
		}
	}
`

export function PostCard() {
	const form = useZodForm({
		schema: CommentSchema,
	})

	const [createComment] = useMutation<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>(CREATE_COMMENT_MUTATION)

	const router = useRouter()

	const { data, error, loading } = useQuery<PostQuery, PostQueryVariables>(
		POST_QUERY,
		{
			variables: {
				id: router.query.id as string,
			},
			skip: !router.isReady,
		}
	)

	const [toggleLike] = useMutation<
		ToggleLikeMutation,
		ToggleLikeMutationVariables
	>(TOGGLE_LIKE_MUTATION, {
		update: (cache, result) => {
			if (!result.data?.toggleLike.success) return

			cache.modify({
				id: `Post:${data?.seePost.id}`,
				fields: {
					isLiked(prev) {
						return !prev
					},
					likes(prev) {
						if (data?.seePost.isLiked) {
							return prev - 1
						}
						return prev + 1
					},
				},
			})
		},
	})

	if (!data) return <div>TODO: No data</div>

	return (
		<div className="max-w-2xl mx-auto flex flex-wrap space-y-4">
			<div className=" w-full pb-6 md:pb-0">
				<div>
					<Card className="rounded-t-lg ">
						<div className="px-4 py-4  sm:p-4 sm:rounded-lg">
							<div className="flex space-x-3">
								<div className="flex-shrink-0">
									<img
										className="h-10 w-10 rounded-full"
										src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
								</div>
								<div className="min-w-0 flex-1">
									<p className=" font-medium ">
										<a href="#" className="hover:underline">
											{data.seePost.user.username}
											<span className="text-muted text-sm">
												@{data.seePost.user.username}
											</span>
										</a>
									</p>
									<p className="text-sm text-muted">
										<a href="#" className="hover:underline">
											<time>
												{formatDistance(
													new Date(data.seePost.createdAt),
													new Date(),
													{ addSuffix: true }
												)}
											</time>
										</a>
									</p>
								</div>
							</div>
						</div>

						<div className="px-4 py-3  ">
							<Interweave content={data.seePost.caption} />
						</div>

						{data.seePost.image && (
							<div className="mx-auto">
								<Image
									alt="TODO"
									width="700px"
									height="500px"
									blurHash="UG5##AkCROf6.Aj[Riay%hoLV@ayx^jZV@ay"
									src="http://res.cloudinary.com/dogecorp/image/upload/v1631192257/dogesocial/v1/images/e7jpyiortr4aljxpatnv.jpg"
								/>
							</div>
						)}
					</Card>

					<Card className="py-4 px-4 flex justify-between space-x-8">
						<div className="flex space-x-6">
							<span className="inline-flex">
								<p className="font-bold">{data.seePost.likes}</p>
								<p className="font-medium ml-1 ">Likes</p>{' '}
							</span>
							<span className="inline-flex">
								<p className="font-bold">{data.seePost.totalComments}</p>
								<p className="font-medium ml-1 ">Comments</p>{' '}
							</span>
						</div>
					</Card>

					<Card className="py-4 px-4 flex justify-between space-x-8 rounded-b-lg">
						<div className="flex space-x-6">
							<span className="inline-flex items-center text-sm">
								<Button
									onClick={async () => {
										await toggleLike({
											variables: { id: data.seePost.id },
										})
									}}
									variant="dark"
								>
									{data.seePost.isLiked ? (
										<HiHeart
											className="h-5 w-5 text-brand-600"
											aria-hidden="true"
										/>
									) : (
										<HiOutlineHeart className="h-5 w-5" aria-hidden="true" />
									)}
									<span className="font-medium ml-1">Like</span>
									<span className="sr-only">likes</span>{' '}
								</Button>
							</span>

							<span className="inline-flex items-center text-sm">
								<Button onClick={() => form.setFocus('body')} variant="dark">
									<span>
										<HiOutlineReply className="h-5 w-5" aria-hidden="true" />
									</span>
									<span className="font-medium ml-1">Reply</span>
									<span className="sr-only">Reply</span>
								</Button>
							</span>
						</div>
						<div className="flex text-sm">
							<span className="inline-flex items-center text-sm">
								<Button variant="dark">
									<span>
										<HiOutlineShare className="h-5 w-5" aria-hidden="true" />
									</span>
									<span className="font-medium ml-1">Share</span>
									<span className="sr-only">Share</span>
								</Button>
							</span>
						</div>
					</Card>
				</div>
			</div>
			<Card className="w-full" rounded="lg">
				<Card.Body>
					<Form
						form={form}
						onSubmit={async (values) => {
							await createComment({
								variables: {
									input: {
										body: values.body,
										postId: router.query.id as string,
									},
								},
							})
							toast('Done boss')
							form.reset()
						}}
					>
						<TextArea
							label="Your reply"
							{...form.register('body')}
							placeholder="An interesting comment"
						/>
						<div className="flex justify-end space-x-2">
							<Form.SubmitButton>Reply</Form.SubmitButton>
							<Button variant="dark">Cancel</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-full relative">
				<Comments postId={data.seePost.id!} />
			</div>
		</div>
	)
}
