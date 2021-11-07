import { builder } from '~/graphql/builder'
import { prisma } from '~/lib/db'

builder.queryField('searchUser', (t) =>
	t.prismaConnection({
		type: 'User',
		cursor: 'id',
		args: { keyword: t.arg.string() },
		resolve: async (query, _, { keyword }, _ctx) => {
			const users = await prisma.user.findMany({
				...query,
				where: {
					username: {
						startsWith: keyword,
					},
				},
			})
			return users
		},
	})
)
