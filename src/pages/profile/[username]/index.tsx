import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Profile, PROFILE_QUERY } from '~/components/Profile/Profile'
import { preloadQuery } from '~/lib/apollo'

export default function ProfilePage() {
	const router = useRouter()
	const username = router.query.username as string
	console.log(username)
	return <Profile username={username} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	console.log(ctx.query)
	return preloadQuery(ctx, {
		query: PROFILE_QUERY,
		variables: {
			username: ctx.query.username,
		},
	})
}
