import { ReactElement } from 'react'
import { ProfilePageLayout } from '~/components/Common/Layouts/ProfilePageLayout'

export default function Profile() {
	return (
		<div>
			<h1>HI</h1>
		</div>
	)
}

Profile.getLayout = function getLayout(page: ReactElement) {
	return <ProfilePageLayout>{page}</ProfilePageLayout>
}
