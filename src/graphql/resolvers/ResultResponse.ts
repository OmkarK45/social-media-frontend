import { builder } from '~/graphql/builder'

builder.queryField('health', (t) =>
	t.field({
		type: 'String',
		resolve: (_root, _args, _ctx) => {
			return 'Health OK'
		},
	})
)

export const ResultResponse = builder.simpleObject('ResultResponse', {
	fields: (t) => ({
		success: t.boolean(),
	}),
})
