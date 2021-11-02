import { prisma } from '~/lib/db'

export const Loader = {
	loadUsersById: async function (ids: Array<string>) {
		console.log('Im called')
		const users = await prisma.user.findMany({
			where: { id: { in: ids } },
		})
		return users
	},
}
