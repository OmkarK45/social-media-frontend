import { z } from 'zod'
import { decodeGlobalID } from '@giraphql/plugin-relay'

import { prisma } from '~/lib/db'
import { upload } from '~/lib/upload'

import { builder } from '~/graphql/builder'
import { HashTag, parseHashtags } from '~/graphql/utils/hashtags'

import { ResultResponse } from '../ResultResponse'
import { parseMentions } from '~/graphql/utils/parseMentions'
import { getMentions } from '~/graphql/utils/getMentions'

builder.prismaNode('Post', {
	findUnique: (id) => ({ id }),
	id: { resolve: (post) => post.id },
	fields: (t) => ({
		caption: t.exposeString('caption', { nullable: true }),
		image: t.exposeString('image', { nullable: true }),
		gifImage: t.exposeString('gifLink', { nullable: true }),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
		updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
		blurHash: t.exposeString('blurHash', { nullable: true }),
		isMine: t.boolean({
			resolve: async ({ userId }, _, { user }) => {
				if (!user) {
					return false
				}
				return userId === user.id
			},
		}),
		isLiked: t.boolean({
			resolve: async ({ id }, _, { user }) => {
				if (!user) {
					return false
				}
				const hasLiked = await prisma.like.findUnique({
					where: { postId_userId: { postId: id, userId: user.id } },
					select: { id: true },
				})
				if (hasLiked) {
					return true
				}
				return false
			},
		}),
		user: t.relation('user'),
		hashtags: t.relatedConnection('hashtags', {
			cursor: 'id',
		}),
		comments: t.relatedConnection('comments', {
			cursor: 'id',
			totalCount: true,
		}),
		likes: t.relatedConnection('likes', {
			cursor: 'id',
			totalCount: true,
		}),
	}),
})

const CreatePostInput = builder.inputType('CreatePostInput', {
	fields: (t) => ({
		caption: t.field({
			type: 'String',
			validate: { schema: z.string().min(1).max(512) },
		}),
		media: t.field({ type: 'FileUpload', required: false }),
		gifLink: t.string({ required: false }),
	}),
})

/** Creates a new Post */
builder.mutationField('createPost', (t) =>
	t.prismaField({
		type: 'Post',
		args: { input: t.arg({ type: CreatePostInput }) },
		resolve: async (query, _, { input }, { user, session }) => {
			/**  Incoming image file  */
			let media
			let response
			let blurHash
			console.log(input)
			if (input.media && input.media !== null) {
				media = await input.media
				response = await upload(media)
			}
			/** Upload to cloudinary */

			/** logic for placeholder */
			/** Parse hashtags from caption */
			let hashTags: Array<HashTag> = []

			if (input.caption) {
				hashTags = parseHashtags(input.caption)
			}

			const post = await prisma.post.create({
				data: {
					caption: input.caption,
					image: response ? response.url : null,
					gifLink: input.gifLink,
					user: { connect: { id: user!.id } },
					...(hashTags.length > 0 && {
						hashtags: {
							connectOrCreate: hashTags,
						},
					}),
				},
			})

			const usersMentioned = await parseMentions(
				getMentions(input.caption),
				session,
				post
			)
			const mentions = usersMentioned.filter(
				(user) => user.receiverId !== session?.userId
			)

			await prisma.notification.createMany({
				data: mentions,
				skipDuplicates: true,
			})

			return post
		},
	})
)

/** Delete Post */
builder.mutationField('deletePost', (t) =>
	t.field({
		type: ResultResponse,
		args: { id: t.arg.string() },
		authScopes: { user: true },
		resolve: async (_, { id }, { user }) => {
			const photo = await prisma.post.findUnique({
				where: { id: decodeGlobalID(id).id },
				select: { userId: true },
				rejectOnNotFound: true,
			})

			if (photo.userId !== user!.id) {
				throw new Error('You are not authorized to perform this operation.')
			}
			await prisma.comment.deleteMany({
				where: { postId: decodeGlobalID(id).id },
			})
			await prisma.like.deleteMany({
				where: { postId: decodeGlobalID(id).id },
			})
			await prisma.post.delete({
				where: { id: decodeGlobalID(id).id },
			})

			return {
				success: true,
			}
		},
	})
)

const EditPostInput = builder.inputType('EditPostInput', {
	fields: (t) => ({
		id: t.string(),
		caption: t.string(),
		gifLink: t.string({ required: false }),
	}),
})

/** Edit Post */
builder.mutationField('editPost', (t) =>
	t.prismaField({
		type: 'Post',
		args: { input: t.arg({ type: EditPostInput }) },
		authScopes: { user: true },
		resolve: async (query, _parent, { input }, { user }) => {
			const oldPost = await prisma.post.findFirst({
				where: { id: decodeGlobalID(input.id).id, userId: user!.id },
				include: {
					hashtags: {
						select: { hashtag: true },
					},
				},
				rejectOnNotFound: true,
			})

			return await prisma.post.update({
				where: { id: decodeGlobalID(input.id).id },
				data: {
					caption: input.caption,
					gifLink: input.gifLink,
					hashtags: {
						disconnect: oldPost.hashtags,
						connectOrCreate: parseHashtags(input.caption),
					},
				},
			})
		},
	})
)

// see individual post
builder.queryField('seePost', (t) =>
	t.prismaField({
		type: 'Post',
		args: { id: t.arg.string() },
		resolve: async (query, _, { id }, _ctx) => {
			const decodedID = decodeGlobalID(id)
			return await prisma.post.findUnique({
				...query,
				where: { id: decodedID.id },
				rejectOnNotFound: true,
			})
		},
	})
)

builder.queryField('postsByHashtag', (t) =>
	t.prismaConnection({
		type: 'Post',
		cursor: 'id',
		args: { hashtag: t.arg.string() },
		resolve: async (query, _, { hashtag }, _ctx) => {
			const posts = await prisma.post.findMany({
				...query,
				where: {
					hashtags: {
						some: {
							hashtag: { equals: hashtag.toLowerCase() },
						},
					},
				},
			})
			return posts
		},
	})
)

builder.queryField('popularPosts', (t) =>
	t.prismaConnection({
		type: 'Post',
		args: { orderBy: t.arg.string() },
		cursor: 'id',
		resolve: async (query, parent, args, ctx) => {
			const popularPosts = await prisma.post.findMany({
				...query,
				where: {
					userId: {
						not: ctx.user?.id,
					},
				},
				orderBy: [
					{ likes: { _count: 'desc' } },
					{ comments: { _count: 'desc' } },
				],
			})
			return popularPosts
		},
	})
)

// TODO : come up with logic
// builder.queryField('popularPosts', (t) =>
// 	t.connection({
// 		type: PostObject,
// 		args: { orderBy: t.arg.string() },
// 		resolve: async (_, { orderBy }, { user }) => {
// 			const popularPosts = await prisma.post.findMany({
// 				where : { userId : { not : user?.id}},
// 				include : {
// 					likes : true
// 				},
// 				orderBy : {

// 				}
// 			})
// 		},
// 	})
// )
