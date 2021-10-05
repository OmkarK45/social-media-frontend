import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'
import { gql, useQuery } from '@apollo/client'
import {
	PopularHashtagsQuery,
	PopularHashtagsQueryVariables,
} from './__generated__/Hashtags.generated'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'

const HASHTAGS_QUERY = gql`
	query PopularHashtagsQuery($first: Int!, $after: ID) {
		popularHashtags(first: $first, after: $after) {
			edges {
				cursor
				node {
					id
					hashtag
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`

export function Hashtags() {
	const { data, loading, error } = useQuery<
		PopularHashtagsQuery,
		PopularHashtagsQueryVariables
	>(HASHTAGS_QUERY, {
		variables: {
			first: 10,
			after: null,
		},
	})

	if (!data) return <h1>No Data</h1>

	if (loading) return <LoadingFallback />

	if (error)
		return <ErrorFallback noAction message="Failed to load hashtags." />

	return (
		<Card>
			<Card.Body>
				<Heading size="h3">Hashtags.</Heading>
				<p className="text-muted text-base">Showing top 10 popular hashtags</p>
			</Card.Body>
			<div className="w-full border-t border-gray-300" />
			<Card.Body>
				<ul className="divide-y divide-gray-200">
					{data.popularHashtags.edges.map((edge, index) => {
						return (
							<li key={edge?.cursor} className="py-4 flex text-lg font-medium">
								{index + 1}. {edge?.node.hashtag}
							</li>
						)
					})}
				</ul>
			</Card.Body>
		</Card>
	)
}
