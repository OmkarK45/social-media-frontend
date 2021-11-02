import { z } from 'zod'

import { builder } from '../builder'

export const EditProfileInput = builder.inputType('EditProfileInput', {
	fields: (t) => ({
		username: t.string({
			required: false,
			// TODO
			// validate: { schema: z.string().min(3).max(15) },
		}),
		bio: t.string({ required: false }),
		lastName: t.string({ required: false }),
		firstName: t.string({ required: false }),
		// look into these if we want these to be as URL or a file itself
		avatar: t.field({ type: 'FileUpload', required: false }),
		coverImage: t.field({ type: 'FileUpload', required: false }),
	}),
})
