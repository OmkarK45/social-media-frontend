import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { Navbar } from '~/components/Common/Navbar'
import { SearchResults } from '~/components/Search'
import { authenticatedRoute } from '~/utils/redirection'

export default function SearchResultsPage() {
	return <SearchResults />
}

export const getServerSideProps: GetServerSideProps = authenticatedRoute

SearchResultsPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<Navbar />
			{page}
		</>
	)
}
