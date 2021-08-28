import { NextApiRequest, NextApiResponse } from 'next'
import { applySession } from 'next-iron-session'
import { removeClientSession, sessionOptions } from '~/utils/sessions'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await applySession(req, res, sessionOptions)
	const sessionId = await removeClientSession(req)
	res.send(JSON.stringify(sessionId))
}

export default handler
