import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { PostPageLayout } from '~/components/Common/Layouts/PostPageLayout'
import { Navbar } from '~/components/Common/Navbar'
import { PostCard, POST_QUERY } from '~/components/Post/PostCard'
import { preloadQuery } from '~/lib/apollo'
import { authenticatedRoute } from '~/utils/redirection'

export const getServerSideProps: GetServerSideProps<
	{},
	{
		id: string
	}
> = async (ctx) => {
	const auth = await authenticatedRoute(ctx)
	if ('redirect' in auth) {
		return auth
	}

	return preloadQuery(ctx, {
		query: POST_QUERY,
		variables: {
			id: ctx.params?.id,
		},
	})
}
export default function Post() {
	return (
		<div className="mt-20">
			<PostCard />
		</div>
	)
}

Post.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<Navbar />
			<PostPageLayout>{page}</PostPageLayout>
		</>
	)
}
