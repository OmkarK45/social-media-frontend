import { GetServerSideProps } from 'next'
import { SearchResults } from '~/components/Search'
import { authenticatedRoute } from '~/utils/redirection'

export default SearchResults

export const getServerSideProps: GetServerSideProps = authenticatedRoute
