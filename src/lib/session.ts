import { Session, User } from '@prisma/client'
import { prisma } from './db'
import { GetServerSidePropsContext } from 'next'
import { SessionOptions, applySession } from 'next-iron-session'
import { IncomingMessage } from 'http'

const IRON_SESSION_ID_KEY = 'sessionID'

// Use a custom IncomingMessage type:
interface ReqWithSession extends IncomingMessage {
	session: import('next-iron-session').Session
}

if (!process.env.COOKIE_SECRET) {
	throw new Error('No `COOKIE_SECRET` environment variable was set.')
}

export const sessionOptions: SessionOptions = {
	password: [
		{
			id: 1,
			password: process.env.COOKIE_SECRET as string,
		},
	],
	cookieName: 'session.info',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		httpOnly: true,
	},
}

export async function createSession(req: IncomingMessage, user: User) {
	const session = await prisma.session.create({
		data: {
			userId: user.id,
			expiresAt: new Date(),
		},
	})

	// NOTE: We refine the type here, as next-iron-session will add the session to the request:
	const reqWithSession = req as unknown as ReqWithSession

	reqWithSession.session.set(IRON_SESSION_ID_KEY, session.id)
	await reqWithSession.session.save()

	return session
}

export async function removeSession(req: IncomingMessage, session: Session) {
	// NOTE: We refine the type here, as next-iron-session will add the session to the request:
	const reqWithSession = req as unknown as ReqWithSession

	reqWithSession.session.destroy()

	await prisma.session.delete({ where: { id: session!.id } })
}

interface PrismaSession extends Session {
	user: User
}

const sessionCache = new WeakMap<IncomingMessage, PrismaSession | null>()
export async function resolveSession({
	req,
	res,
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) {
	if (sessionCache.has(req)) {
		return sessionCache.get(req)
	}

	await applySession(req, res, sessionOptions)

	let session: PrismaSession | null = null

	// NOTE: We refine the type here, as next-iron-session will add the session to the request:
	const reqWithSession = req as unknown as ReqWithSession
	const sessionID = reqWithSession.session.get(IRON_SESSION_ID_KEY)

	if (sessionID) {
		session = await prisma.session.findUnique({
			where: { id: sessionID },
			include: {
				user: true,
			},
		})
	}

	sessionCache.set(req, session)

	return session
}
