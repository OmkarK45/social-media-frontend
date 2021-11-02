import { decodeGlobalID } from '@giraphql/plugin-relay'
import { builder } from '~/graphql/builder'
import { prisma } from '~/lib/db'
import { createNotification } from '../notifications/NotificationResolver'
import { ResultResponse } from '../ResultResponse'

builder.prismaNode('Like', {
	findUnique: (id) => ({ id }),
	id: { resolve: (like) => like.id },
	fields: (t) => ({
		post: t.relation('post'),
		user: t.relation('user'),
	}),
})

builder.mutationField('toggleLike', (t) =>
	t.field({
		type: ResultResponse,
		args: { id: t.arg.string({}) },
		resolve: async (_, { id }, { user }) => {
			const post = await prisma.post.findFirst({
				where: { id: decodeGlobalID(id).id },
				rejectOnNotFound: true,
			})

			let like = await prisma.like.findUnique({
				where: {
					postId_userId: {
						postId: decodeGlobalID(id).id,
						userId: user!.id,
					},
				},
			})
			if (like) {
				await prisma.like.delete({
					where: {
						postId_userId: {
							postId: decodeGlobalID(id).id,
							userId: user!.id,
						},
					},
				})
			} else {
				like = await prisma.like.create({
					data: {
						user: { connect: { id: user!.id } },
						post: { connect: { id: decodeGlobalID(id).id } },
					},
				})
				console.log({
					dispatcherId: user!.id,
					receiverId: post!.userId,
					entityId: post.id!,
				})
				await createNotification({
					type: 'POST_LIKE',
					dispatcherId: user!.id,
					receiverId: post!.userId,
					entityId: like.id!,
				})
			}

			return {
				success: true,
			}
		},
	})
)
