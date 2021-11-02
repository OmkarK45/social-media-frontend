import SchemaBuilder from '@giraphql/core'
import RelayPlugin from '@giraphql/plugin-relay'
import ScopeAuthPlugin from '@giraphql/plugin-scope-auth'
import DataloaderPlugin from '@giraphql/plugin-dataloader'
import ValidationPlugin from '@giraphql/plugin-validation'
import SimpleObjectsPlugin from '@giraphql/plugin-simple-objects'
import PrismaTypes from 'prisma/giraphql-types'
import PrismaPlugin from '@giraphql/plugin-prisma'
import { IncomingMessage, OutgoingMessage } from 'http'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { prisma } from '~/lib/db'
import { Session, User } from '@prisma/client'
import { Loader } from './loader'

export interface Context {
	req: IncomingMessage
	res: OutgoingMessage
	session?: Session | null
	loader: typeof Loader
	user?: User
}

export function createGraphQLContext(
	req: IncomingMessage,
	res: OutgoingMessage,
	session?: (Session & { user: User }) | null
): Context {
	return {
		req,
		res,
		user: session?.user,
		session,
		loader: Loader,
	}
}

export const builder = new SchemaBuilder<{
	DefaultInputFieldRequiredness: true
	PrismaTypes: PrismaTypes
	Context: Context
	Scalars: {
		ID: { Input: string; Output: string | number }
		DateTime: { Input: Date; Output: Date }
		FileUpload: { Input: FileUpload; Output: FileUpload }
	}
	AuthScopes: {
		user: boolean
		unauthenticated: boolean
	}
}>({
	defaultInputFieldRequiredness: true,
	plugins: [
		ScopeAuthPlugin,
		SimpleObjectsPlugin,
		ValidationPlugin,
		DataloaderPlugin,
		RelayPlugin,
		PrismaPlugin,
	],
	prisma: { client: prisma },
	authScopes: async ({ user }) => ({
		user: !!user,
		unauthenticated: !user,
	}),
	relayOptions: {
		nodeQueryOptions: {},
		nodesQueryOptions: {},
		nodeTypeOptions: {},
		pageInfoTypeOptions: {},
	},
})

builder.queryType({})
builder.mutationType({})

builder.scalarType('DateTime', {
	serialize: (date) => date.toISOString(),
	parseValue: (date) => new Date(date),
})

builder.addScalarType('FileUpload', GraphQLUpload, {})
