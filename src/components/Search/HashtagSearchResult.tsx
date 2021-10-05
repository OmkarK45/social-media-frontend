import { useRouter } from 'next/router'
import { FeedPostCard } from '../Post/FeedPostCard'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import { Heading } from '../ui/Heading'
import { HashtagSearchQuery } from './__generated__/index.generated'

export function HashtagSearchResult({
	data,
}: {
	data: HashtagSearchQuery | undefined
}) {
	const router = useRouter()

	if (!data)
		return (
			<ErrorFallback
				action={() => router.reload()}
				message={`Failed to load search result.`}
				buttonText="Try again."
			/>
		)

	const posts = data.searchByHashtag.edges

	return (
		<div>
			<Heading size="h4" className="py-4 px-4">
				Posts tagged #{router.query.query}
			</Heading>

			{posts.length > 0 ? (
				posts.map((edge) => {
					const data = edge?.node
					if (data) {
						return <FeedPostCard key={data.id} {...data} />
					}
				})
			) : (
				<ErrorFallback
					action={() => router.back()}
					message={`No posts tagged with #${router.query.query}`}
					buttonText="Go back."
				/>
			)}
		</div>
	)
}
