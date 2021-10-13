import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { z } from 'zod'
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
	const [deletePost, { loading, data, error }] = useMutation<
		DeletePostMutation,
		DeletePostMutationVariables
	>(DELETE_POST_MUTATION)

	const router = useRouter()

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
								toast('POST HAS BEEN DELETED')
								onClose()
								router.push('/feed')
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
