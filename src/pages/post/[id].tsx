import { useRouter } from 'next/router'
import { Interweave } from '~/components/Interweave'
import { Heading } from '~/components/ui/Heading'

export default function Post() {
	const router = useRouter()
	const { id } = router.query
	return (
		<div>
			POST PAGE
			<Heading size="h4">{id}</Heading>
			<Interweave content="😍😍😍😍😍😍 https://sushilburagute.github.io #OK #NOTOK" />
		</div>
	)
}
