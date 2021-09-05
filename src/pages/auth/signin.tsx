import { GetServerSideProps } from 'next'
import { LoginForm } from '~/components/Auth/SignIn'
import { unauthenticatedRoute } from '~/utils/redirection'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default LoginForm
