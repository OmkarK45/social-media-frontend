/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { format, formatDistance } from 'date-fns'
import toast from 'react-hot-toast'
import {
	HiHeart,
	HiOutlineHeart,
	HiOutlineReply,
	HiOutlineShare,
} from 'react-icons/hi'
import { z } from 'zod'
import NextImage from 'next/image'

import { Interweave } from '../Interweave'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { TextArea } from '../ui/TextArea'

import { Comments, COMMENTS_QUERY } from '../Comments/Comments'
import { CREATE_COMMENT_MUTATION } from './ReplyModal'
import { PostDropdown } from './PostDropdown'
import { TOGGLE_LIKE_MUTATION } from './FeedPostCard'

import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import Modal from '../ui/Modal'
import { Link } from '~/components/ui/Link'

import {
	PostQuery,
	PostQueryVariables,
} from './__generated__/PostCard.generated'
import {
	CreateCommentMutation,
	CreateCommentMutationVariables,
} from './__generated__/ReplyModal.generated'
import {
	ToggleLikeMutation,
	ToggleLikeMutationVariables,
} from './__generated__/FeedPostCard.generated'
import { ViewLikes } from './ViewLikes'
import { SEO } from '../SEO'

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
			comments {
				totalCount
			}
			isMine
			isLiked
			createdAt
			updatedAt
			user {
				username
				avatar
			}
			likes {
				totalCount
			}
		}
	}
`

export function PostCard() {
	const [imageModal, setImageModal] = useState<boolean>(false)
	const [likesModal, setLikesModal] = useState<boolean>(false)

	const router = useRouter()

	const form = useZodForm({
		schema: CommentSchema,
	})

	const [createComment] = useMutation<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>(CREATE_COMMENT_MUTATION, {
		refetchQueries: [COMMENTS_QUERY, 'CommentsQuery'],
		update: (cache) => {
			cache.modify({
				id: `Post:${router.query.id as string}`,
				fields: {
					comments(prev) {
						return {
							...prev,
							totalCount: prev.totalCount + 1,
						}
					},
				},
			})
		},
	})

	const { data, error, loading } = useQuery<PostQuery, PostQueryVariables>(
		POST_QUERY,
		{
			variables: {
				id: router.query.id as string,
			},
			skip: !router.isReady,
			fetchPolicy: 'cache-first',
		}
	)

	const [toggleLike] = useMutation<
		ToggleLikeMutation,
		ToggleLikeMutationVariables
	>(TOGGLE_LIKE_MUTATION, {
		update: (cache) => {
			cache.modify({
				id: `Post:${router.query.id as string}`,
				fields: {
					isLiked: (prev) => !prev,
					likes: (prev) => {
						return {
							...prev,
							totalCount: prev.totalCount + (data?.seePost.isLiked ? -1 : 1),
						}
					},
				},
			})
		},
	})

	if (loading) return <LoadingFallback />

	if (error)
		return (
			<ErrorFallback
				action={() => window.location.reload()}
				message="Failed to load post for you. It may be deleted or unavailable at this point."
			/>
		)

	if (!data)
		return (
			<ErrorFallback
				action={() => window.location.reload()}
				message="Failed to load post. Please try reloading"
			/>
		)

	const post = data.seePost

	const shareData = {
		title: `${data.seePost.user.username} on DogeSocial.`,
		text: `${
			data.seePost.caption ?? 'Check it out now! See what they have to say.'
		}`,
		url: `https://dogesocial.vercel.app/post/${data.seePost.id}`,
	}

	return (
		<>
			<SEO
				title={`${data.seePost.user.username} on DogeSocial: ${
					post.caption ? post?.caption.slice(0, 255) : ''
				}`}
				description={post.caption ? post.caption.slice(0, 255) : ''}
				image={post.user.avatar}
				path={`/post/${post.id}`}
			/>
			<div className="max-w-2xl mx-auto flex flex-wrap space-y-4 relative">
				<div className="absolute -left-24 top-5">
					<Button variant="dark" onClick={() => router.push('/feed/all')}>
						{' '}
						← Back
					</Button>
				</div>
				<div className="w-full md:pb-0">
					<div>
						<Card className="rounded-t-lg ">
							<div className="px-4 py-4  sm:p-4 sm:rounded-lg">
								<div className="flex space-x-3">
									<div className="flex-shrink-0">
										<img
											className="h-10 w-10 rounded-full"
											src={post.user.avatar!}
											alt=""
										/>
									</div>
									<div className="min-w-0 flex-1">
										<p className=" font-medium ">
											<Link
												href={`/profile/${post.user.username}`}
												className="no-underline"
											>
												{post.user.username}
												<span className="text-muted ml-1 text-sm">
													@{post.user.username}
												</span>
											</Link>
										</p>
										<p className="text-sm text-muted">
											<a href="#" className="hover:underline">
												<time>
													{format(
														new Date(post.createdAt),
														'MMMM d, hh:mm aaa'
													)}{' '}
													(
													{formatDistance(
														new Date(post.createdAt),
														new Date(),
														{
															addSuffix: true,
														}
													)}
													)
												</time>
											</a>
										</p>
									</div>
									<div className="flex-shrink-0 self-center flex">
										<PostDropdown
											id={post.id}
											isMine={post.isMine}
											caption={post.caption ?? ''}
											gifLink={post.gifImage ?? ''}
										/>
									</div>
								</div>
							</div>

							<div className="px-4 pb-4">
								<Interweave content={post.caption} />
							</div>
							{post.gifImage && (
								<div className="mx-auto w-11/12 rounded-lg pb-4 overflow-hidden">
									<img
										className="w-full rounded-lg"
										src={post.gifImage}
										alt={`A moving GIF image posted by ${post.user.username}.`}
									/>
								</div>
							)}
							{post.image && (
								<div className="aspect-w-1 aspect-h-1">
									<NextImage
										onClick={() => setImageModal(true)}
										src={post.image}
										layout="fill"
										objectFit="cover"
										placeholder="empty"
									/>
								</div>
							)}
							<Modal
								className="sm:max-w-7xl p-0 m-0"
								isOpen={imageModal}
								onClose={() => setImageModal(false)}
							>
								<Modal.Content>
									<div
										style={{
											height: '80vh',
											width: '100%',
										}}
									>
										<NextImage
											layout="fill"
											objectFit="contain"
											src={post.image!}
										/>
									</div>
								</Modal.Content>
								{/* hack for focusable element */}
								<Button
									variant="dark"
									className="absolute inset-x-auto top-4 "
									onClick={() => setImageModal(false)}
								>
									Close
								</Button>
							</Modal>
						</Card>

						<Card className="py-2 px-4 flex justify-between space-x-8">
							<div className="flex space-x-6">
								<span className="inline-flex">
									<p className="font-bold">{post.likes.totalCount}</p>
									<button onClick={() => setLikesModal(true)}>
										<p className="text-muted ml-1 ">Likes</p>{' '}
									</button>
									<ViewLikes
										isOpen={likesModal}
										onClose={() => setLikesModal(false)}
									/>
								</span>
								<span className="inline-flex">
									<p className="font-bold">{post.comments.totalCount}</p>
									<p className="text-muted ml-1 ">Comments</p>{' '}
								</span>
							</div>
						</Card>

						<Card className="py-4 px-4 flex justify-between space-x-8 rounded-b-lg">
							<div className="flex space-x-6">
								<span className="inline-flex items-center text-sm">
									<Button
										onClick={async () => {
											// setHasLiked(!hasLiked)
											// setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1)
											await toggleLike({
												variables: { id: post.id },
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
										<span className="ml-1">Like</span>
										<span className="sr-only">likes</span>{' '}
									</Button>
								</span>

								<span className="inline-flex items-center text-sm">
									<Button onClick={() => form.setFocus('body')} variant="dark">
										<span>
											<HiOutlineReply className="h-5 w-5" aria-hidden="true" />
										</span>
										<span className="ml-1">Reply</span>
										<span className="sr-only">Reply</span>
									</Button>
								</span>
							</div>
							<div className="flex text-sm">
								<span className="inline-flex items-center text-sm">
									<Button
										variant="dark"
										onClick={async () => {
											navigator.clipboard
												.writeText(
													`https://dogesocial.vercel.app/post/${post.id}`
												)
												.then(() => toast.success('Link copied to clipboard'))
										}}
									>
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
								toast.success('Your comment has been posted.')
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
					<Comments postId={post.id!} />
				</div>
			</div>
		</>
	)
}
