import { builder } from '~/graphql/builder'
import { EditProfileInput } from '~/graphql/input'
import { prisma } from '~/lib/db'
import { upload } from '~/lib/upload'

builder.prismaNode('User', {
	findUnique: (id) => ({ id }),
	id: { resolve: (user) => user.id },
	fields: (t) => ({
		email: t.exposeString('email'),
		bio: t.exposeString('bio', { nullable: true }),
		avatar: t.exposeString('avatar'),
		coverImage: t.exposeString('coverImage'),
		coverImageBg: t.exposeString('coverImageBg'),
		username: t.exposeString('username'),
		lastName: t.exposeString('lastName', { nullable: true }),
		firstName: t.exposeString('firstName'),
		createdAt: t.expose('createdAt', { type: 'DateTime' }),
		updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
		followingCount: t.relationCount('following'),
		followersCount: t.relationCount('followers'),
		postsCount: t.relationCount('posts'),
		followers: t.relatedConnection('followers', {
			cursor: 'id',
			totalCount: true,
		}),
		following: t.relatedConnection('following', {
			cursor: 'id',
			totalCount: true,
		}),
		posts: t.relatedConnection('posts', {
			cursor: 'id',
			totalCount: true,
		}),
		isMe: t.boolean({
			resolve: async ({ id }, _, { user }) => {
				return id === user?.id
			},
		}),
		isFollowing: t.boolean({
			resolve: async ({ id }, _, { user }) => {
				const following = await prisma.user.count({
					where: {
						username: user?.username,
						following: { some: { id } },
					},
				})
				return Boolean(following)
			},
		}),
	}),
})

builder.queryField('me', (t) =>
	t.prismaField({
		type: 'User',
		authScopes: { user: true },
		resolve: async (query, _, _args, { user }) => {
			const me = await prisma.user.findUnique({
				...query,
				where: { email: user?.email },
				rejectOnNotFound: true,
			})
			console.log(me)
			return me
		},
	})
)

builder.mutationField('editProfile', (t) =>
	t.prismaField({
		type: 'User',
		args: { input: t.arg({ type: EditProfileInput }) },
		authScopes: {
			user: true,
			unauthenticated: false,
		},
		resolve: async (query, _parent, { input }, { user }) => {
			let username
			let firstName
			console.log('INPUT', input)
			const avatarUpload = input.avatar ? await upload(input.avatar) : null

			const coverImageUpload = input.coverImage
				? await upload(input.coverImage)
				: null

			if (input.username) {
				username = input.username
			}

			if (input.firstName) {
				firstName = input.firstName
			}

			const updatedUser = await prisma.user.update({
				where: { email: user!.email },
				data: {
					username,
					bio: input.bio,
					lastName: input.lastName,
					firstName,
					avatar: avatarUpload?.url,
					coverImage: coverImageUpload?.url,
					coverImageBg: coverImageUpload?.url,
				},
			})
			return updatedUser
		},
	})
)
