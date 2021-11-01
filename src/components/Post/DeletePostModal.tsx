import { gql, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'
import Modal from '../ui/Modal'
import {
	DeletePostMutation,
	DeletePostMutationVariables,
} from './__generated__/DeletePostModal.generated'

interface Props {
	isOpen: boolean
	onClose: () => void
	id: string
}

const DELETE_POST_MUTATION = gql`
	mutation DeletePostMutation($id: String!) {
		deletePost(id: $id) {
			success
		}
	}
`

export function DeletePostModal({ isOpen, onClose, id }: Props) {
	const [deletePost] = useMutation<
		DeletePostMutation,
		DeletePostMutationVariables
	>(DELETE_POST_MUTATION, {
		update: (cache) => {
			const normalizedId = cache.identify({ id, __typename: 'Post' })
			cache.evict({ id: normalizedId })
			cache.gc()
		},
	})

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-lg">
			<Modal.Header dismiss>
				<Heading size="h4">Delete Post?</Heading>
				<p className="text-sm text-muted">This action cannot be undone.</p>
			</Modal.Header>
			<Card.Body noPadding className="mt-4">
				<div className="flex justify-end space-x-3">
					<Button type="button" onClick={onClose} size="lg" variant="dark">
						Cancel
					</Button>
					<Button
						onClick={async () => {
							const response = await deletePost({ variables: { id } })
							if (response.data?.deletePost.success) {
								onClose()
								toast.success('Requested post has been deleted.')
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
