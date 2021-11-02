import { z } from 'zod'

import { builder } from '../builder'

export const LoginInput = builder.inputType('LoginInput', {
	fields: (t) => ({
		email: t.string({ validate: { email: true } }),
		password: t.string({ validate: { minLength: 6 } }),
	}),
})

export const SignUpInput = builder.inputType('SignUpInput', {
	fields: (t) => ({
		email: t.string({
			validate: {
				schema: z.string().email('The given email address is invalid.'),
			},
		}),
		username: t.string({
			validate: {
				schema: z
					.string()
					.min(3, 'Username must be atleast 3 characters long')
					.max(15, 'Username is too long. Please use less than 15 characters'),
			},
		}),
		firstName: t.string({ validate: { schema: z.string().min(2).max(50) } }),
		lastName: t.string({ validate: { schema: z.string().min(1).max(50) } }),
		password: t.string({
			validate: {
				schema: z
					.string()
					.min(6, 'Please keep atleast 6 characters in password.'),
			},
		}),
	}),
})

export const SignInInput = builder.inputType('SignInInput', {
	fields: (t) => ({
		email: t.string({ validate: { schema: z.string().email() } }),
		password: t.string({ validate: { type: 'string' } }),
	}),
})

export const ChangePasswordInput = builder.inputType('ChangePasswordInput', {
	fields: (t) => ({
		oldPassword: t.string({ validate: { schema: z.string().min(6) } }),
		newPassword: t.string({ validate: { schema: z.string().min(6) } }),
	}),
})
