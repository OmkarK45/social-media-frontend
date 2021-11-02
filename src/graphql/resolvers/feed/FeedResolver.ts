import { builder } from '~/graphql/builder'
import { prisma } from '~/lib/db'

builder.queryField('feed', (t) =>
	t.prismaConnection({
		type: 'Post',
		cursor: 'id',
		authScopes: { user: true },
		resolve: async (query, _parent, args, { user }) => {
			const posts = await prisma.post.findMany({
				...query,
				where: {
					OR: [
						{ user: { followers: { some: { id: user!.id } } } },
						{ userId: user?.id },
					],
				},
				orderBy: {
					createdAt: 'desc',
				},
			})
			return posts
		},
	})
)

// posts with particular hashtag
builder.queryField('postsContainingHashtag', (t) =>
	t.prismaConnection({
		type: 'Post',
		cursor: 'id',
		args: { hashtag: t.arg.string() },
		resolve: async (query, _root, { hashtag, ...args }, _ctx) => {
			const posts = await prisma.post.findMany({
				...query,
				where: {
					hashtags: {
						some: {
							hashtag: {
								equals: hashtag,
							},
						},
					},
				},
			})
			return posts
		},
	})
)
