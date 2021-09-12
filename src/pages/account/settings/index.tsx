import { AccountPageLayout } from '~/components/Common/Layouts/AccountPageLayout'
import { authenticatedRoute } from '~/utils/redirection'

export default function AccountPage() {
	return <AccountPageLayout />
}

export const getServerSideProps = authenticatedRoute
