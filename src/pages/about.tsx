import { GetServerSideProps } from 'next'
import Heading from '~/components/ui/Heading'
import Spinner from '~/components/ui/Spinner'
import { authenticatedRoute } from '~/utils/redirection'
import { useUser } from '~/utils/useUser'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default function About() {
	const { loading, user } = useUser()
	return (
		<div>
			<Heading size="h3">User info</Heading>
			{loading && <Spinner className="w-7 h-7" />}
			<p>{user?.username}</p>
		</div>
	)
}
