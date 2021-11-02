import { builder } from '~/graphql/builder'
import { prisma } from '~/lib/db'

const FollowUserInput = builder.inputType('FollowUserInput', {
	fields: (t) => ({ username: t.string({}) }),
})

const FollowUnfollowResponse = builder.simpleObject('FollowResponse', {
	fields: (t) => ({
		ok: t.boolean(),
	}),
})

builder.mutationField('followUser', (t) =>
	t.field({
		type: FollowUnfollowResponse,
		args: { input: t.arg({ type: FollowUserInput }) },
		authScopes: { user: true },
		resolve: async (_, { input }, { user }) => {
			const updatedUser = await prisma.user.update({
				where: { id: user!.id },
				data: {
					following: {
						connect: { username: input.username },
					},
				},
			})

			return { ok: true }
		},
	})
)

builder.mutationField('unfollowUser', (t) =>
	t.field({
		type: FollowUnfollowResponse,
		args: { input: t.arg({ type: FollowUserInput }) },
		authScopes: { user: true },
		resolve: async (_, { input }, { user }) => {
			const updatedUser = await prisma.user.update({
				where: { id: user!.id },
				data: {
					following: {
						disconnect: { username: input.username },
					},
				},
			})

			return { ok: true }
		},
	})
)

builder.queryField('whoToFollow', (t) =>
	t.prismaConnection({
		type: 'User',
		cursor: 'id',
		authScopes: { user: false, unauthenticated: true },
		resolve: async (query, _root, args, { user }) => {
			const following = await prisma.user.findFirst({
				where: { id: user?.id },
				select: { following: { select: { id: true } } },
			})

			const existingFollows = following?.following.map((user) => user.id) ?? []

			return await prisma.user.findMany({
				...query,
				take: 5,
				where: {
					id: {
						notIn: [...existingFollows, user?.id ?? ''],
					},
				},
				orderBy: [
					{ posts: { _count: 'desc' } },
					{ followers: { _count: 'desc' } },
					{ following: { _count: 'desc' } },
				],
			})
		},
	})
)
