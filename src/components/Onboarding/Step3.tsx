import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useUser } from '~/utils/useUser'
import { EDIT_PROFILE_MUTATION } from '../Profile/EditProfileTab'
import {
	EditProfileMutation,
	EditProfileMutationVariables,
} from '../Profile/__generated__/EditProfileTab.generated'
import { Card } from '../ui/Card'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { FileInput } from '../ui/Form/FileInput'
import Form, { useZodForm } from '../ui/Form/Form'
import { TextArea } from '../ui/TextArea'

const ProfileFormSchema = z.object({
	bio: z
		.string()
		.max(400, 'Exceeds 400 characters. Consider keeping bio shorter.')
		.optional()
		.nullable(),
	avatar: z.any().optional(),
	coverImage: z.any().optional(),
})

export function Step3() {
	const { loading, user } = useUser()

	const [updateProfile] = useMutation<
		EditProfileMutation,
		EditProfileMutationVariables
	>(EDIT_PROFILE_MUTATION)

	const form = useZodForm({
		schema: ProfileFormSchema,
		defaultValues: {
			bio: user?.bio,
		},
	})

	if (loading) return <LoadingFallback />

	return (
		<Card className="space-y-4 my-6 overflow-hidden" rounded="lg">
			<Card.Body className="space-y-1">
				<div className="text-2xl font-bold">Your profile</div>
				<div className="text-gray-500">
					Tell us a little bit about yourself — this is how others will see you
					on DogeSocial. You’ll always be able to edit this later in your
					Settings.
				</div>
			</Card.Body>
			<Form
				form={form}
				onSubmit={async (values) => {
					const changedValues = Object.fromEntries(
						Object.keys(form.formState.dirtyFields).map((key) => [
							key,
							// @ts-ignore
							values[key],
						])
					)

					const input = {
						...changedValues,
						avatar: values?.avatar?.[0],
						coverImage: values?.coverImage?.[0],
					}

					await updateProfile({
						variables: { input } as EditProfileMutationVariables,
					})

					toast('Profile updated successfully.')
				}}
			>
				<div className="flex space-x-3 px-5">
					<div className="flex-[0.3]">
						<FileInput
							existingimage={user?.avatar}
							name="avatar"
							accept="image/png, image/jpg, image/jpeg, image/gif"
							multiple={false}
						/>
					</div>
					<div className="flex-[0.7] ">
						<FileInput
							existingimage={user?.coverImage}
							accept="image/png, image/jpg, image/jpeg, image/gif"
							name="coverImage"
							label="Cover Image"
							multiple={false}
						/>
					</div>
				</div>

				<div className="px-5 py-10">
					<TextArea
						{...form.register('bio')}
						label="Bio"
						placeholder="Write a few lines about yourself."
					/>
				</div>
				<Card.Footer className="flex flex-row-reverse">
					<Form.SubmitButton>Save</Form.SubmitButton>
				</Card.Footer>
			</Form>
		</Card>
	)
}
