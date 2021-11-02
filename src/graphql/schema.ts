import path from 'path'
import fs from 'fs'
import { printSchema, lexicographicSortSchema } from 'graphql'

import { builder } from '~/graphql/builder'
import '~/graphql/resolvers'

export const schema = builder.toSchema({})
const schemaAsString = printSchema(lexicographicSortSchema(schema))

if (process.env.NODE_ENV !== 'production') {
	fs.writeFileSync(
		path.join(process.cwd(), 'src/graphql/schema.gql'),
		schemaAsString
	)
}
