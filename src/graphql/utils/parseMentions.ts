import { prisma } from '~/lib/db'
import { NotificationType, Post, User, Session } from '@prisma/client'
/**
 *
 * @param mentions array of usernames
 * @param session current user session
 * @param post post on which mentions happened
 * @returns data to be inserted using prisma
 */
export async function parseMentions(
	mentions: string[],
	session: Session | null | undefined,
	post: Post
) {
	if (mentions) {
		const users = await prisma.user.findMany({
			where: { username: { in: mentions } },
		})

		return users.map((user) => {
			return {
				dispatcherId: session?.userId as string,
				receiverId: user.id,
				postId: post.id,
				entityId: post.id,
				type: 'USER_MENTION' as NotificationType,
			}
		})
	} else {
		return []
	}
}
