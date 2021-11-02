import { schema } from '~/graphql/schema'
import { Context, createGraphQLContext } from '~/graphql/builder'
import {
	getGraphQLParameters,
	processRequest,
	renderGraphiQL,
	shouldRenderGraphiQL,
} from 'graphql-helix'
import { NextApiHandler } from 'next'
import { ExecutionResult, GraphQLError } from 'graphql'
import { IncomingHttpHeaders } from 'http'
import { resolveSession } from '~/lib/session'

function getGraphQLCode(error: Error & { code?: number }) {
	return error.code ?? error.name === 'NotFoundError' ? 404 : null
}

function formatResult(result: ExecutionResult) {
	const formattedResult: ExecutionResult = {
		data: result.data,
	}

	if (result.errors) {
		formattedResult.errors = result.errors.map((error) => {
			// NOTE: If you need to debug a specific server-side GraphQL error, you may want to uncomment this log:
			// console.log(error.originalError);

			// Return a generic error message instead
			return new GraphQLError(
				error.message,
				error.nodes,
				error.source,
				error.positions,
				error.path,
				error.originalError,
				{
					code: getGraphQLCode(error.originalError as any),
					path: (error.originalError as any)?.path,
					...(error.originalError as any)?.extensions,
				}
			)
		})
	}

	return formattedResult
}

interface GraphQLRequest {
	body?: any
	headers: IncomingHttpHeaders
	method: string
	query: any
}

const handler: NextApiHandler = async (req, res) => {
	const session = await resolveSession({ req, res })

	try {
		const request: GraphQLRequest = {
			headers: req.headers,
			method: req.method ?? 'GET',
			query: req.query,
			body: req.body,
		}

		if (shouldRenderGraphiQL(request)) {
			res.setHeader('Content-Type', 'text/html')
			res.send(renderGraphiQL({ endpoint: '/api/graphql' }))
		} else {
			const { operationName, query, variables } = getGraphQLParameters(request)

			const result = await processRequest<Context>({
				operationName,
				query,
				variables,
				request,
				schema,
				contextFactory: () => createGraphQLContext(req, res, session),
			})

			if (result.type !== 'RESPONSE') {
				throw new Error(`Unsupported response type: "${result.type}"`)
			}

			result.headers.forEach(({ name, value }) => res.setHeader(name, value))
			res.status(result.status)
			res.json(formatResult(result.payload))
		}
	} catch (err: any) {
		res.status(500)
		res.end(err.toString())
	}
}

export default handler
