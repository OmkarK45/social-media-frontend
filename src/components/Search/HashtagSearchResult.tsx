import { useRouter } from 'next/router'
import { FeedPostCard } from '../Post/FeedPostCard'
import { Heading } from '../ui/Heading'
import { HashtagSearchQuery } from './__generated__/index.generated'

export function HashtagSearchResult({
	data,
}: {
	data: HashtagSearchQuery | undefined
}) {
	const router = useRouter()

	if (!data) return <h1>No search results</h1>

	return (
		<div>
			<Heading size="h4" className="py-4 px-4">
				Posts tagged #{router.query.query}
			</Heading>
			{data.searchByHashtag.edges.map((edge) => {
				const data = edge?.node
				if (data) {
					return <FeedPostCard key={edge.node.id} {...edge?.node} />
				}
			})}
		</div>
	)
}
