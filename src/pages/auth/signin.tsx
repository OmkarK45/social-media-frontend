import { GetServerSideProps } from 'next'
import { SignIn } from '~/components/Auth/SignIn'
import { unauthenticatedRoute } from '~/utils/redirection'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default SignIn
