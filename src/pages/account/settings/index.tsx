import { ReactElement } from 'react'
import { AccountPageLayout } from '~/components/Common/Layouts/AccountPageLayout'
import { Navbar } from '~/components/Common/Navbar'
import { authenticatedRoute } from '~/utils/redirection'

export default function AccountPage() {
	return <AccountPageLayout />
}

export const getServerSideProps = authenticatedRoute

AccountPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<Navbar />
			{page}
		</>
	)
}
