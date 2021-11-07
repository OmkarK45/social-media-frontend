import { builder } from '~/graphql/builder'
import { prisma } from '~/lib/db'

builder.prismaNode('Hashtag', {
	findUnique: (id) => ({ id }),
	id: { resolve: (hashtag) => hashtag.id },
	fields: (t) => ({
		hashtag: t.exposeString('hashtag'),
		posts: t.relatedConnection('posts', {
			cursor: 'id',
		}),
		postsCount: t.relationCount('posts'),
	}),
})

builder.queryField('popularHashtags', (t) =>
	t.prismaConnection({
		type: 'Hashtag',
		cursor: 'id',
		defaultSize: 10,
		resolve: async (query, _, args, _ctx) => {
			const popularHashtags = await prisma.hashtag.findMany({
				...query,
			})
			return popularHashtags
		},
	})
)

builder.queryField('searchByHashtag', (t) =>
	t.prismaConnection({
		type: 'Post',
		cursor: 'id',
		args: { keyword: t.arg.string() },
		resolve: async (query, _root, { keyword }, _ctx) => {
			const postsWithHashtag = await prisma.post.findMany({
				...query,
				where: {
					hashtags: {
						some: {
							hashtag: {
								startsWith: keyword,
							},
						},
					},
				},
			})
			return postsWithHashtag
		},
	})
)
