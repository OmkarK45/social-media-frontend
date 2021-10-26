/* eslint-disable @next/next/no-img-element */
import { gql, useMutation } from '@apollo/client'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { Interweave } from '../Interweave'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import Modal from '../ui/Modal'
import { TextArea } from '../ui/TextArea'
import { Props as FeedPostCardProps } from './FeedPostCard'
import { CommentSchema } from './PostCard'
import {
	CreateCommentMutation,
	CreateCommentMutationVariables,
} from './__generated__/ReplyModal.generated'

interface ReplyModalProps extends FeedPostCardProps {
	isOpen: boolean
	onClose: () => void
}

export const CREATE_COMMENT_MUTATION = gql`
	mutation CreateCommentMutation($input: CreateCommentInput!) {
		createComment(input: $input) {
			body
			id
		}
	}
`

export function ReplyModal({ isOpen, onClose, ...props }: ReplyModalProps) {
	const [createComment] = useMutation<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>(CREATE_COMMENT_MUTATION, {
		update: (cache, result) => {
			console.log('called')
			cache.modify({
				id: `Post:${props.post.id}`,
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

	const form = useZodForm({
		schema: CommentSchema,
	})

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-lg">
			<Modal.Header dismiss>
				<Heading size="h4" className="-mt-2 mb-3">
					Reply
				</Heading>
			</Modal.Header>
			<div className="max-w-3xl mx-auto">
				<div className="px-3">
					<div className="flex space-x-3">
						<div className="flex-shrink-0">
							<img
								className="h-10 w-10 rounded-full"
								src={props.post.user?.avatar}
								alt=""
							/>
						</div>
						<div className="min-w-0 flex-1">
							<p className="text-sm font-medium ">
								<a href="#" className="hover:underline">
									{props.post?.user?.firstName +
										' ' +
										props.post?.user?.lastName ?? ''}
									<span className="text-muted text-sm ml-2">
										@{props.post?.user?.username}
									</span>
								</a>
							</p>
							<p className="text-sm text-gray-500">
								<a href="#" className="hover:underline">
									<time>
										{format(
											new Date(props.post.createdAt!),
											'MMMM d, hh:mm aaa'
										)}
									</time>
								</a>
							</p>
						</div>
					</div>
				</div>
				<div className=" mt-4">
					<p className=" space-y-4 dark:text-gray-300">
						{props.post.caption && !props.post.image && (
							<Interweave content={props.post.caption} />
						)}
						{props.post.caption && props.post.image && (
							<Interweave content={props.post.caption + props.post.image} />
						)}
					</p>
				</div>
				<div className="w-full mt-4">
					<Card.Body noPadding>
						<Form
							form={form}
							onSubmit={async (values) => {
								await createComment({
									variables: {
										input: {
											body: values.body,
											postId: props.post.id!,
										},
									},
								})

								toast('Your comment has been posted!')

								onClose()
							}}
						>
							<TextArea
								label="Your reply"
								placeholder="An interesting comment"
								{...form.register('body')}
							/>

							<div className="flex justify-end space-x-2">
								<Form.SubmitButton>Reply</Form.SubmitButton>
								<Button type="button" onClick={onClose} variant="dark">
									Cancel
								</Button>
							</div>
						</Form>
					</Card.Body>
				</div>
			</div>
		</Modal>
	)
}
