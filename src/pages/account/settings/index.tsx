import { AccountPageLayout } from '~/components/Common/Layouts/AccountPageLayout'
import { authenticatedRoute } from '~/utils/redirection'

export default function ProfilePage() {
	return (
		<>
			{/* todo : change this to layout  */}
			<AccountPageLayout />
		</>
	)
}

// ProfilePage.getLayout = function getLayout(page: ReactElement) {
// 	return <AccountPageLayout>{page}</AccountPageLayout>
// }

export const getServerSideProps = authenticatedRoute
