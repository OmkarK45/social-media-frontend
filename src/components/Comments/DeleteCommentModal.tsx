import { gql, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'
import Modal from '../ui/Modal'

interface DeleteCommentModalProps {
	isOpen: boolean
	onClose: () => void
	id: string
	postId: string
}

const DELETE_COMMENT_MUTATION = gql`
	mutation DeleteCommentMutation($id: String!) {
		deleteComment(id: $id) {
			success
		}
	}
`

export function DeleteCommentModal({
	id,
	isOpen,
	onClose,
	postId,
}: DeleteCommentModalProps) {
	const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
		update(cache) {
			const normalizedId = cache.identify({ id, __typename: 'Comment' })
			cache.modify({
				id: `Post:${postId}`,
				fields: {
					comments(prev) {
						return {
							...prev,
							totalCount: prev.totalCount - 1,
						}
					},
				},
			})
			cache.evict({ id: normalizedId })
			cache.gc()
		},
	})

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-lg">
			<Modal.Header dismiss>
				<Heading size="h4">Delete Comment?</Heading>
				<p className="text-sm text-muted">This action cannot be undone.</p>
			</Modal.Header>
			<Card.Body noPadding className="mt-4">
				<div className="flex justify-end space-x-3">
					<Button type="button" onClick={onClose} size="lg" variant="dark">
						Cancel
					</Button>
					<Button
						onClick={async () => {
							const response = await deleteComment({ variables: { id } })
							if (response.data?.deleteComment.success) {
								toast('Comment has been deleted.')
								onClose()
							}
						}}
						size="lg"
					>
						Confirm Delete
					</Button>
				</div>
			</Card.Body>
		</Modal>
	)
}
