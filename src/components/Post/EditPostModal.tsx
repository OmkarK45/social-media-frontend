import { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import Modal from '../ui/Modal'
import { TextArea } from '../ui/TextArea'
import { CreatePostSchema } from './CreatePost'
import {
	EditPostMutation,
	EditPostMutationVariables,
} from './__generated__/EditPostModal.generated'

interface Props {
	isOpen: boolean
	onClose: () => void
	id: string
	caption: string
	gifLink: string
}

const EDIT_POST_MUTATION = gql`
	mutation EditPostMutation($input: EditPostInput!) {
		editPost(input: $input) {
			caption
			id
		}
	}
`

export function EditPost({ isOpen, onClose, id, caption, gifLink }: Props) {
	const [editPost] = useMutation<EditPostMutation, EditPostMutationVariables>(
		EDIT_POST_MUTATION
	)

	const form = useZodForm({
		schema: CreatePostSchema,
	})

	useEffect(() => {
		form.reset({
			caption: caption,
		})
	}, [form])

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-lg">
			<Modal.Header dismiss>
				<Heading size="h4">Edit Post</Heading>
				<p className="text-sm text-muted">
					Only caption edits are supported for now.
				</p>
			</Modal.Header>
			<Card.Body noPadding className="mt-4">
				<Form
					form={form}
					onSubmit={async (values) => {
						await editPost({
							variables: {
								input: { caption: values.caption, id, gifLink },
							},
						})
						onClose()
						toast('Post caption has been edited successfully.')
					}}
				>
					<TextArea
						label="Caption"
						placeholder="Include body for your post."
						{...form.register('caption')}
					/>

					<div className="flex justify-end space-x-3">
						<Button type="button" onClick={onClose} size="lg" variant="dark">
							Cancel
						</Button>
						<Form.SubmitButton size="lg">Save Edit</Form.SubmitButton>
					</div>
				</Form>
			</Card.Body>
		</Modal>
	)
}
