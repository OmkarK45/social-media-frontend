import { useRouter } from 'next/router'
import { Heading } from '~/components/ui/Heading'

export default function Post() {
	const router = useRouter()
	const { id } = router.query

	return (
		<h1>
			POST PAGE
			<Heading size="h4">{id}</Heading>
		</h1>
	)
}
