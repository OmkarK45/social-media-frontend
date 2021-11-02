import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { resolveSession } from '~/lib/session'

export async function unauthenticatedRoute(
	ctx: GetServerSidePropsContext,
	redirect: string = '/'
) {
	const session = await resolveSession(ctx)

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

export async function authenticatedRoute(
	ctx: GetServerSidePropsContext,
	redirect = '/auth/signup'
): Promise<GetServerSidePropsResult<{}>> {
	const session = await resolveSession(ctx)

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
