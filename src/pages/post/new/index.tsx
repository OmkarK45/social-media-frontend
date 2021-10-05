import { GetServerSideProps } from 'next'
import { ReactElement } from 'react-window/node_modules/@types/react'
import { Navbar } from '~/components/Common/Navbar'

import { Create } from '~/components/Post'
import { authenticatedRoute } from '~/utils/redirection'

export default function CreatePage() {
	return <Create />
}

export const getServerSideProps: GetServerSideProps = authenticatedRoute

CreatePage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<Navbar />
			{page}
		</>
	)
}
