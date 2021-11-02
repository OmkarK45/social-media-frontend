import { Session } from '@prisma/client'

import { builder } from '~/graphql/builder'
import { ChangePasswordInput, SignInInput, SignUpInput } from '~/graphql/input'

import { login } from '~/lib/auth'
import { hashPassword, verifyPassword } from '~/lib/password'

import { ResultResponse } from '../ResultResponse'
import { prisma } from '~/lib/db'
import { createSession, removeSession } from '~/lib/session'
import { getAvatar } from '~/graphql/utils/avatar'
import { generateCoverImage } from '~/graphql/utils/generateCoverImage'

export const SessionObject = builder.objectRef<Session>('Session')

SessionObject.implement({
	fields: (t) => ({
		id: t.exposeID('id'),
		userId: t.exposeID('userId'),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
		updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
		expiresAt: t.expose('expiresAt', { type: 'DateTime', nullable: true }),
	}),
})

builder.queryField('sessionById', (t) =>
	t.field({
		type: SessionObject,
		args: { id: t.arg.string() },
		resolve: async (_, { id }, { session, user }) => {
			return session!
		},
	})
)

const AuthResponseObject = builder.simpleObject('AuthResponse', {
	fields: (t) => ({
		success: t.boolean(),
		user: t.prismaField({
			type: 'User',
			resolve: async (query, _parent, _args, { user }) => {
				return await prisma.user.findUnique({
					...query,
					where: { id: user?.id },
					rejectOnNotFound: true,
				})
			},
		}),
		session: t.field({
			type: SessionObject,
		}),
	}),
})

builder.mutationField('signUp', (t) =>
	t.field({
		type: AuthResponseObject,
		args: { input: t.arg({ type: SignUpInput, required: true }) },
		resolve: async (_, { input }, { req }) => {
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [{ email: input.email }, { username: input.username }],
				},
			})

			if (existingUser)
				throw new Error(
					'Given email address is already registered. Please log in instead.'
				)

			const newUser = await prisma.user.create({
				data: {
					username: input.username,
					email: input.email,
					firstName: input.firstName,
					lastName: input.lastName,
					hashedPassword: await hashPassword(input.password),
					avatar: getAvatar(),
					coverImage: generateCoverImage().coverImage,
					coverImageBg: generateCoverImage().coverImageBg,
				},
			})

			const session = await createSession(req, newUser)

			return { success: true, user: newUser, session }
		},
	})
)

builder.mutationField('signIn', (t) =>
	t.field({
		type: AuthResponseObject,
		args: {
			input: t.arg({ type: SignInInput, required: true }),
		},
		resolve: async (_, { input }, { req, res }) => {
			const user = await login(input.email, input.password)

			const session = await createSession(req, user)

			return {
				success: true,
				user,
				session,
			}
		},
	})
)

builder.mutationField('logout', (t) =>
	t.field({
		type: ResultResponse,
		authScopes: {
			user: true,
		},
		resolve: async (_, _args, { req, session }) => {
			await removeSession(req, session!)

			return {
				success: true,
			}
		},
	})
)

builder.mutationField('changePassword', (t) =>
	t.field({
		type: ResultResponse,
		args: {
			input: t.arg({ type: ChangePasswordInput, required: true }),
		},
		authScopes: { unauthenticated: false, user: true },
		resolve: async (_, { input }, { res, user, session }) => {
			const isValid = await verifyPassword(
				user!.hashedPassword,
				input.oldPassword
			)

			if (!isValid) {
				throw new Error('The old password provided is incorrect.')
			}

			await prisma.user.update({
				where: { email: user!.email },
				data: {
					hashedPassword: await hashPassword(input.newPassword),
					sessions: {
						deleteMany: { id: { not: session!.id } },
					},
				},
			})
			return {
				success: true,
			}
		},
	})
)
