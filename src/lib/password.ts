import bcrypt from 'bcryptjs'

export async function hashPassword(password: string) {
	const salt = await bcrypt.genSalt(10)

	return await bcrypt.hash(password, salt)
}

export async function verifyPassword(hashedPassword: string, password: string) {
	return await bcrypt.compare(password, hashedPassword)
}
