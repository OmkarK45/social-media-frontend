import { User } from '@prisma/client'
import { AuthenticationError, ValidationError } from 'apollo-server-errors'

import { prisma } from './db'
import { verifyPassword } from './password'

export async function login(email: string, password: string): Promise<User> {
	const user = await prisma.user.findFirst({
		where: {
			email: {
				equals: email,
				mode: 'insensitive',
			},
		},
	})

	if (!user) {
		throw new AuthenticationError(
			'No account with those credentials was found.'
		)
	}

	const correctPassword = await verifyPassword(user.hashedPassword, password)
	console.log(correctPassword)
	if (!correctPassword) {
		throw new AuthenticationError('The password provided is incorrect.')
	}

	return user
}
