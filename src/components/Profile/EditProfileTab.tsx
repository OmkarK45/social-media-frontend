import { useQuery, gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { object, z } from 'zod'
import { ME_QUERY, useUser } from '~/utils/useUser'
import { Card } from '../ui/Card'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { FileInput } from '../ui/Form/FileInput'
import Form, { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import { Input } from '../ui/Input'
import { TextArea } from '../ui/TextArea'
import {
	EditProfileMutation,
	EditProfileMutationVariables,
} from './__generated__/EditProfileTab.generated'

const EditProfileFormSchema = object({
	username: z
		.string()
		.min(4, 'Username is too short')
		.max(15, 'Username is too long. Consider making it shorter.')
		.optional(),
	firstName: z
		.string()
		.min(1, 'Firstname must be longer than one character.')
		.max(20, 'Consider putting a shorter first name.'),
	bio: z
		.string()
		.max(400, 'Exceeds 400 characters. Consider keeping bio shorter.')
		.optional()
		.nullable(),
	lastName: z
		.string()
		.min(1)
		.max(20, 'Consider keeping last name shorter.')
		.optional()
		.nullable(),
	email: z.string().email('Must be a valid email address.'),
	avatar: z.any().optional(),
	coverImage: z.any().optional(),
})

export const EDIT_PROFILE_MUTATION = gql`
	mutation EditProfileMutation($input: EditProfileInput!) {
		editProfile(input: $input) {
			bio
			username
			firstName
			lastName
		}
	}
`

export function EditProfileTab() {
	const { user, loading } = useUser()

	const [updateProfile] = useMutation<
		EditProfileMutation,
		EditProfileMutationVariables
	>(EDIT_PROFILE_MUTATION, {
		refetchQueries: ['MeQuery', ME_QUERY],
	})

	const form = useZodForm({
		schema: EditProfileFormSchema,
		defaultValues: {
			username: user?.username,
			bio: user?.bio,
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
		},
	})

	useEffect(() => {
		form.reset({
			username: user?.username,
			bio: user?.bio,
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
		})
	}, [user])

	if (loading) {
		return <LoadingFallback />
	}

	return (
		<Card rounded="lg" className="lg:max-w-3xl">
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
						bio: values.bio,
					}
					console.log(input)
					await updateProfile({
						variables: { input } as EditProfileMutationVariables,
					})

					toast('Profile updated successfully.')
				}}
			>
				<Card.Body>
					<Heading size="h3">Profile</Heading>
					<p className="text-muted text-sm">
						This information will be displayed publicly so be careful what you
						share.
					</p>

					<div className="container pt-5 space-y-6 mx-auto">
						<div className="flex space-x-3 ">
							<div className="flex-[0.3]">
								<FileInput
									existingimage={user?.avatar}
									name="avatar"
									accept="image/png, image/jpg, image/jpeg, image/gif"
									multiple={false}
								/>
							</div>
							<div className="flex-[0.7]">
								<FileInput
									existingimage={user?.coverImage}
									accept="image/png, image/jpg, image/jpeg, image/gif"
									name="coverImage"
									label="Cover Image"
									multiple={false}
								/>
							</div>
						</div>
						<div>
							<Input
								{...form.register('username')}
								label="Username"
								placeholder="Your username"
								prefix="dogesocial.com/@"
							/>
						</div>
						<div className="flex space-x-3">
							<div className="flex-1">
								<Input
									{...form.register('firstName')}
									label="First Name"
									placeholder="Your First Name"
								/>
							</div>
							<div className="flex-1">
								<Input
									{...form.register('lastName')}
									label="Last Name"
									placeholder="Your last name"
								/>
							</div>
						</div>
						<div>
							<Input
								{...form.register('email')}
								readOnly
								label="Email Address"
							/>
						</div>
						<div>
							<TextArea
								{...form.register('bio')}
								label="Bio"
								placeholder="Write a few lines about yourself."
							/>
						</div>
					</div>
				</Card.Body>
				<Card.Footer className="flex justify-end">
					<Form.SubmitButton size="lg">Save</Form.SubmitButton>
				</Card.Footer>
			</Form>
		</Card>
	)
}
