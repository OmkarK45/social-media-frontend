import { NextApiRequest, NextApiResponse } from 'next'
import { applySession } from 'next-iron-session'
import { createClientSession, sessionOptions } from '~/utils/sessions'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await applySession(req, res, sessionOptions)
	const sessionId = await createClientSession(req, req.body)
	res.json(sessionId)
}

export default handler
