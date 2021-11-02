import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { schema } from '~/graphql/schema'
import { createGraphQLContext } from '~/graphql/builder'
import { resolveSession } from '~/lib/session'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { IncomingMessage, OutgoingMessage } from 'http'
import { Session, User } from '.prisma/client'
import { processRequest } from 'graphql-upload'

// const server = new ApolloServer({ schema, context: createGraphQLContext })

function getServer(
	req: IncomingMessage,
	res: OutgoingMessage,
	session: (Session & { user: User }) | null | undefined
) {
	return new ApolloServer({
		schema,
		context: createGraphQLContext(req, res, session),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	})
}

const handler: NextApiHandler = async (req, res) => {
	const session = await resolveSession({ req, res })

	const server = getServer(req, res, session)
	const contentType = req.headers['content-type']

	if (contentType && contentType.startsWith('multipart/form-data')) {
		// @ts-ignore
		req.filePayload = await processRequest(req, res)
	}

	await server.start()

	await server.createHandler({ path: '/api/graphql-micro' })(req, res)
}

export const config = {
	api: {
		bodyParser: false,
	},
}

export default handler
