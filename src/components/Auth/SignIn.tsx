import { object, string } from 'zod'
import { Input } from '../ui/Input'
import Form, { useZodForm } from '~/components/ui/Form/Form'
import { gql, useMutation } from '@apollo/client'
import { Link } from '../ui/Link'
import { useAuthRedirect } from '~/utils/useAuthRedirect'

import router from 'next/router'
import { AuthLayout } from './AuthLayout'
import { Card } from '../ui/Card'
import toast from 'react-hot-toast'
import {
	LoginFormMutation,
	LoginFormMutationVariables,
} from './__generated__/SignIn.generated'
import FormSubmitButton from '../ui/Form/SubmitButton'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'

const loginSchema = object({
	email: string().email(),
	password: string().min(6),
})

export function LoginForm() {
	const authRedirect = useAuthRedirect()

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
				authRedirect()
			},
			onError(err) {
				toast(err.message)
			},
		}
	)

	const form = useZodForm({
		schema: loginSchema,
	})

	async function handleGuestLogin(e: any) {
		form.setValue('email', 'test_account@dogesocial.app')
		form.setValue('password', 'test_user')
		e.preventDefault()
		await login({
			variables: {
				input: { email: 'test_account@dogesocial.app', password: 'test_user' },
			},
		})
	}

	return (
		<AuthLayout
			title="Sign In."
			subtitle="Welcome back! Sign in to your DogeSocial account."
		>
			<Form
				form={form}
				onSubmit={async ({ email, password }) => {
					await login({ variables: { input: { email, password } } })
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

				<FormSubmitButton size="lg">Login</FormSubmitButton>
				<Button variant="dark" size="lg" onClick={handleGuestLogin}>
					Login as guest
				</Button>
			</Form>
			<div>
				<Card rounded="lg" className="mt-4">
					<Card.Body>
						<span className="mr-1">Don’t have an account yet ?</span>
						<Link
							className="font-medium text-brand-600 hover:text-brand-400"
							href="/auth/signup"
						>
							Join DogeSocial™
						</Link>
					</Card.Body>
				</Card>
			</div>
		</AuthLayout>
	)
}
