import { GetServerSideProps } from 'next'
import { authenticatedRoute } from '~/utils/redirection'
import { FeedLayout } from '~/components/Common/Layouts/FeedLayout'
import { Navbar } from '~/components/Common/Navbar'
import { ReactElement } from 'react'

export default function FeedPage() {
	return <FeedLayout />
}

/** TODO : eslint*/
export const getServerSideProps: GetServerSideProps = authenticatedRoute

FeedPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<Navbar />
			{page}
		</>
	)
}
