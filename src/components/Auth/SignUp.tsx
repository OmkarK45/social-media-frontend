import { gql, useMutation } from '@apollo/client'
import router from 'next/router'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { initializeSession } from '~/utils/initializeSession'
import { useAuthRedirect } from '~/utils/useAuthRedirect'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import FormSubmitButton from '../ui/Form/SubmitButton'
import { Input } from '../ui/Input'
import { Link } from '../ui/Link'
import { AuthLayout } from './AuthLayout'
import {
	SignUpMutation,
	SignUpMutationVariables,
} from './__generated__/SignUp.generated'

const SignUpSchema = z.object({
	email: z.string().email(),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	username: z.string().min(3),
	password: z.string().min(5),
})

export function SignUp() {
	const [signup, { data }] = useMutation<
		SignUpMutation,
		SignUpMutationVariables
	>(
		gql`
			mutation SignUpMutation($input: SignUpInput!) {
				signUp(input: $input) {
					success
					session {
						id
					}
					user {
						username
					}
				}
			}
		`,
		{
			onCompleted: () => {
				router.push('/feed')
			},
			onError: (error) => toast(error.message),
		}
	)

	const authRedirect = useAuthRedirect()
	const makeSession = initializeSession()

	const form = useZodForm({
		schema: SignUpSchema,
	})

	return (
		<AuthLayout title="Sign Up." subtitle="Sign up and join the DogeSocial!">
			<Form
				form={form}
				onSubmit={(values) => {
					signup({ variables: { input: { ...values } } })
					if (data?.signUp.success) {
						makeSession(data.signUp.session.id)
						router.push('/feed')
					}
				}}
			>
				<Input
					label="Email Address"
					type="email"
					placeholder="you@example.com"
					{...form.register('email')}
				/>

				<Input
					label="First Name"
					type="text"
					placeholder="John"
					{...form.register('firstName')}
				/>

				<Input
					label="Last Name"
					type="text"
					placeholder="Doe"
					{...form.register('lastName')}
				/>

				<Input
					label="Username"
					type="text"
					placeholder="Your Username"
					{...form.register('username')}
				/>

				<Input
					label="Password"
					type="password"
					placeholder="Your password (min 5)"
					{...form.register('password')}
				/>

				<FormSubmitButton size="lg">Sign Up</FormSubmitButton>
			</Form>
			<div>
				<Card rounded="lg" className="mt-4">
					<Card.Body>
						<span className="mr-1">Already have an account ?</span>
						<Link
							className="font-medium text-brand-600 hover:text-brand-400"
							href="/auth/signin"
						>
							Log into DogeSocial™
						</Link>
					</Card.Body>
				</Card>
			</div>
		</AuthLayout>
	)
}
