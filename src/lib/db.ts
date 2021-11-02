import { PrismaClient } from '@prisma/client'

// Ensure that there's only a single Prisma instance in dev. This is detailed here:
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
declare global {
	var __globalPrisma__: PrismaClient
}

export let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient({
		log: ['error', 'warn'],
	})
} else {
	if (!global.__globalPrisma__) {
		global.__globalPrisma__ = new PrismaClient({
			log: ['query', 'error', 'warn'],
		})
	}

	prisma = global.__globalPrisma__
}
