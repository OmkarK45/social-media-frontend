import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { initializeSession } from '~/utils/initializeSession'
import { useAuthRedirect } from '~/utils/useAuthRedirect'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import FormSubmitButton from '../ui/Form/SubmitButton'
import { Input } from '../ui/Input'
import { Link } from '../ui/Link'
import { AuthLayout } from './AuthLayout'
import {
	LoginMutation,
	LoginMutationVariables,
} from './__generated__/SignIn.generated'

const LOGIN_MUTATION = gql`
	mutation LoginMutation($input: SignInInput!) {
		signIn(input: $input) {
			success
			user {
				username
			}
			session {
				id
			}
			success
		}
	}
`

const LoginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(5, 'Make sure password is atleast 5 characters long.'),
})

export function SignIn() {
	const authRedirect = useAuthRedirect()
	const makeSession = initializeSession()
	const router = useRouter()

	const [login, result] = useMutation<LoginMutation, LoginMutationVariables>(
		LOGIN_MUTATION,
		{
			// onCompleted: () => router.push('/about'),
			onError: (error) => toast(error.message),
		}
	)

	const form = useZodForm({
		schema: LoginSchema,
	})

	const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
		try {
			await login({
				variables: {
					input: { email: values.email, password: values.password },
				},
			})
			if (result.data?.signIn.success) {
				await makeSession(result.data.signIn.session.id)
				router.push('/about')
			} else {
				console.log(result)
			}
		} catch (e) {
			console.log('Error occured', e)
		}
	}

	console.log('rendered')
	return (
		<AuthLayout
			title="Sign In."
			subtitle="Welcome back! Sign in to your DogeSocial account."
		>
			<Form form={form} onSubmit={(values) => handleSubmit(values)}>
				<Input
					{...form.register('email')}
					label="Email Address"
					type="email"
					placeholder="you@example.com"
					autoComplete="new-password"
				/>

				<Input
					{...form.register('password')}
					label="Password"
					type="password"
					placeholder="Your password"
				/>
				<Button onClick={() => console.log('clicked')} type="submit" fullWidth>
					Login
				</Button>
				{/* <FormSubmitButton size="lg" fullWidth>
					Login
				</FormSubmitButton> */}
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
