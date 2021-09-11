import { Feed } from '~/components/Feed'
import Image from 'next/image'
import { Image as BlurImage } from '~/components/ui/Image'
import { Blurhash } from 'react-blurhash'
import { GetServerSideProps } from 'next'
import { authenticatedRoute } from '~/utils/redirection'
import { ReactElement } from 'react'
import { FeedLayout } from '~/components/Common/Layouts/FeedLayout'

export default function FeedPage() {
	return (
		<>
			<Feed />
		</>
	)
}
FeedPage.getLayout = function getLayout(page: ReactElement) {
	return <FeedLayout>{page}</FeedLayout>
}
/** TODO : eslint*/
export const getServerSideProps: GetServerSideProps = authenticatedRoute

// TODO : getstaticprops for initial data
