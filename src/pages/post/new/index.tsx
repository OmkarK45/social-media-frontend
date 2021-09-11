import { GetServerSideProps } from 'next'
import { Create } from '~/components/Post'
import { authenticatedRoute } from '~/utils/redirection'

export default Create

export const getServerSideProps: GetServerSideProps = authenticatedRoute
