import { GetServerSideProps } from 'next'
import { Follows } from '~/components/Profile/Follows'
import { authenticatedRoute } from '~/utils/redirection'

export default Follows

export const getServerSideProps: GetServerSideProps = authenticatedRoute
