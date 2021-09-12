import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { ProfilePageLayout } from '~/components/Common/Layouts/ProfilePageLayout'
import { Profile } from '~/components/Profile/Profile'

// TODO : make this usable for any other profile as well
export default function ProfilePage() {
	const router = useRouter()
	const username = router.query.username as string
	return <Profile username={username} />
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
	return <ProfilePageLayout>{page}</ProfilePageLayout>
}
