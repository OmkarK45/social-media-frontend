import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import Modal from '../ui/Modal'
import { TextArea } from '../ui/TextArea'
import {
	EditCommentMutation,
	EditCommentMutationVariables,
} from './__generated__/EditCommentModal.generated'

interface EditCommentModalProps {
	isOpen: boolean
	onClose: () => void
	id: string
	body: string
	postId: string
}

const EditCommentSchema = z.object({
	body: z.string().min(1, 'Comment should consist atleast one character.'),
})

const EDIT_COMMENT_MUTATION = gql`
	mutation EditCommentMutation($input: EditCommentInput!) {
		editComment(input: $input) {
			success
		}
	}
`

export function EditCommentModal({
	isOpen,
	onClose,
	id,
	body,
	postId,
}: EditCommentModalProps) {
	const form = useZodForm({
		schema: EditCommentSchema,
	})
	console.log(postId)
	const [editComment] = useMutation<
		EditCommentMutation,
		EditCommentMutationVariables
	>(EDIT_COMMENT_MUTATION, {
		update(cache) {
			cache.modify({
				id: `Comment:${id}`,
				fields: {
					body() {
						return form.getValues('body')
					},
				},
			})
		},
	})

	useEffect(() => {
		form.reset({
			body,
		})
	}, [form, body])

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-lg">
			<Modal.Header dismiss>
				<Heading size="h4">Edit Comment</Heading>
				<p className="text-sm text-muted">
					Only caption edits are supported for now.
				</p>
			</Modal.Header>
			<Card.Body noPadding className="mt-4">
				<Form
					form={form}
					onSubmit={async (values) => {
						await editComment({
							variables: {
								input: { body: values.body, id, postId },
							},
						})
						onClose()
						toast('Comment has been edited successfully.')
					}}
				>
					<TextArea
						label="Comment"
						placeholder="Edit your comment."
						{...form.register('body')}
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
