import { prisma } from '~/lib/db'
import { builder } from '../../builder'

builder.queryField('seeProfile', (t) =>
	t.prismaField({
		type: 'User',
		args: { username: t.arg.string() },
		authScopes: { user: true },
		resolve: async (query, _root, { username }, _ctx) => {
			const profile = await prisma.user.findUnique({
				...query,
				where: {
					username,
				},
				rejectOnNotFound: true,
			})
			return profile
		},
	})
)
