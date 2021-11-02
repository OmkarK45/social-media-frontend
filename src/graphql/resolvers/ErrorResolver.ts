import { ValidationError } from 'apollo-server-core'
import { builder } from '../builder'

export const ErrorInterface = builder.interfaceRef<Error>('Error')

ErrorInterface.implement({
	fields: (t) => ({
		message: t.exposeString('message'),
	}),
})

const FieldError = builder
	.objectRef<{
		message: string
		path: string
	}>('FieldError')
	.implement({
		fields: (t) => ({
			message: t.exposeString('message'),
			path: t.exposeString('path'),
		}),
	})

builder.objectType(ValidationError, {
	name: 'ValidationError',
	interfaces: [ErrorInterface],
	isTypeOf: (obj) => obj instanceof ValidationError,
	fields: (t) => ({
		fieldError: t.expose('errors', {
			type: [FieldError],
		}),
	}),
})
