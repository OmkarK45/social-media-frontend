import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { resolveClientSession } from './sessions'

export const unauthenticatedRoute = async (
	ctx: GetServerSidePropsContext,
	redirect: string = '/'
) => {
	const session = await resolveClientSession(ctx)

	if (session) {
		return {
			redirect: {
				destination: redirect,
				permanent: false,
			},
		}
	}
	return {
		props: {},
	}
}

export const authenticatedRoute = async (
	ctx: GetServerSidePropsContext,
	redirect = '/auth/signup'
): Promise<GetServerSidePropsResult<{}>> => {
	const session = await resolveClientSession(ctx)

	if (!session) {
		return {
			redirect: {
				destination: `${redirect}?redirect=${encodeURIComponent(
					ctx.resolvedUrl
				)}`,
				permanent: false,
			},
		}
	}
	return {
		props: {},
	}
}
