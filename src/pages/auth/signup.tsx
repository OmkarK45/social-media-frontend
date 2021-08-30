import { GetServerSideProps } from 'next'
import { SignUp } from '~/components/Auth/SignUp'
import { unauthenticatedRoute } from '~/utils/redirection'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default SignUp
