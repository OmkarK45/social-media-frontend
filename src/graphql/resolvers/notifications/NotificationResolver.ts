import { NotificationType } from '@prisma/client'
import { builder } from '~/graphql/builder'
import { prisma } from '~/lib/db'

builder.prismaNode('Notification', {
	findUnique: (id) => ({ id }),
	id: { resolve: (notification) => notification.id },
	fields: (t) => ({
		type: t.exposeString('type'),
		isRead: t.exposeBoolean('isRead'),
		receiver: t.relation('receiver'),
		dispatcher: t.relation('dispatcher'),
		entityId: t.exposeString('entityId'),
		post: t.relation('post', { nullable: true }),
		like: t.relation('like', { nullable: true }),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
		updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
	}),
})

builder.queryField('notifications', (t) =>
	t.prismaConnection({
		type: 'Notification',
		cursor: 'id',
		args: { isRead: t.arg.boolean({ defaultValue: false }) },
		resolve: async (query, parent, { isRead }, { user }) => {
			const notifications = await prisma.notification.findMany({
				...query,
				where: {
					receiver: { id: user?.id },
					isRead,
				},
				orderBy: { createdAt: 'desc' },
			})

			return notifications
		},
	})
)

interface CreateNotificationOptions {
	type: NotificationType
	dispatcherId: string
	receiverId: string
	entityId: string
}

export async function createNotification({
	type,
	dispatcherId,
	receiverId,
	entityId,
}: CreateNotificationOptions) {
	const notification = await prisma.notification.upsert({
		where: { entityId },
		update: { isRead: false },
		create: {
			dispatcher: { connect: { id: dispatcherId } },
			receiver: { connect: { id: receiverId } },
			like: type === 'POST_LIKE' ? { connect: { id: entityId } } : undefined,
			post: type === 'POST_REPLY' ? { connect: { id: entityId } } : undefined,
			entityId,
			type,
		},
	})
	return notification
}
