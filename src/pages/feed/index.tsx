import { GetServerSideProps } from 'next'
import { authenticatedRoute } from '~/utils/redirection'
import { FeedLayout } from '~/components/Common/Layouts/FeedLayout'

export default function FeedPage() {
	return (
		<>
			<FeedLayout />
		</>
	)
}

/** TODO : eslint*/
export const getServerSideProps: GetServerSideProps = authenticatedRoute

// TODO : getstaticprops for initial data
