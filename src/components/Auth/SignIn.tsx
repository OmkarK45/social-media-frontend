import { object, string } from 'zod'
import { Input } from '../ui/Input'
import Form, { useZodForm } from '~/components/ui/Form/Form'
import { gql, useMutation } from '@apollo/client'
import { Link } from '../ui/Link'
import { useAuthRedirect } from '~/utils/useAuthRedirect'

import { useRouter } from 'next/router'
import { AuthLayout } from './AuthLayout'
import { Card } from '../ui/Card'
import { initializeSession } from '~/utils/initializeSession'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'
import {
	LoginFormMutation,
	LoginFormMutationVariables,
} from './__generated__/SignIn.generated'

const loginSchema = object({
	email: string().email(),
	password: string().min(6),
})

export function LoginForm() {
	const authRedirect = useAuthRedirect()
	const router = useRouter()
	const makeSession = initializeSession()

	const [login, loginResult] = useMutation<
		LoginFormMutation,
		LoginFormMutationVariables
	>(
		gql`
			mutation LoginFormMutation($input: SignInInput!) {
				signIn(input: $input) {
					user {
						username
					}
					session {
						id
					}
					success
				}
			}
		`,
		{
			onCompleted: () => {
				router.push('/about')
			},
			onError(err) {
				toast(err.message)
			},
		}
	)

	const form = useZodForm({
		schema: loginSchema,
	})

	return (
		<AuthLayout
			title="Sign In."
			subtitle="Welcome back! Sign in to your DogeSocial account."
		>
			<Form
				form={form}
				onSubmit={async ({ email, password }) => {
					await login({ variables: { input: { email, password } } })
					if (loginResult.data?.signIn.success) {
						await makeSession(loginResult.data.signIn.session.id)
						router.push('/about')
					}
				}}
				className="w-full"
			>
				<Input
					label="Email"
					type="email"
					placeholder="Type your email here"
					autoComplete="email"
					autoFocus
					{...form.register('email')}
				/>

				<Input
					label="Password"
					type="password"
					placeholder="Type your password here"
					autoComplete="current-password"
					{...form.register('password')}
				/>

				<Button type="submit">Login</Button>
			</Form>
			<div>
				<Card rounded="lg" className="mt-4">
					<span className="mr-1">Don’t have an account yet ?</span>
					<Link
						className="font-medium text-brand-600 hover:text-brand-400"
						href="/auth/signup"
					>
						Join DogeSocial™
					</Link>
				</Card>
			</div>
		</AuthLayout>
	)
}
