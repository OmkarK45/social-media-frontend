import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Card } from '../ui/Card'
import { HashtagSearchResult } from './HashtagSearchResult'
import { UserSearchResult } from './UserSearchResult'
import {
	HashtagSearchQuery,
	HashtagSearchQueryVariables,
	UserSearchQuery,
	UserSearchQueryVariables,
} from './__generated__/index.generated'

export const SEARCH_FOR_POST_BY_HASHTAG = gql`
	query HashtagSearchQuery($keyword: String!, $first: Int!) {
		searchByHashtag(keyword: $keyword, first: $first) {
			edges {
				node {
					id
					caption
					image
					blurHash
					gifImage
					totalComments
					isMine
					isLiked
					createdAt
					updatedAt
					user {
						firstName
						lastName
						username
						avatar
					}
					likes
				}
			}
		}
	}
`

export const SEARCH_FOR_USERS_BY_KEYWORD = gql`
	query UserSearchQuery($keyword: String!, $first: Int!) {
		searchUser(keyword: $keyword, first: $first) {
			edges {
				node {
					id
					avatar
					username
					firstName
					lastName
				}
			}
		}
	}
`

export function SearchResults() {
	const router = useRouter()

	const { data: HashtagData } = useQuery<
		HashtagSearchQuery,
		HashtagSearchQueryVariables
	>(SEARCH_FOR_POST_BY_HASHTAG, {
		variables: {
			first: 10,
			keyword: ('#' + router.query.query) as string,
		},
		skip: router.query.type !== 'hashtag',
	})

	const { data: UserData } = useQuery<
		UserSearchQuery,
		UserSearchQueryVariables
	>(SEARCH_FOR_USERS_BY_KEYWORD, {
		variables: {
			keyword: router.query.query as string,
			first: 5,
		},
		skip: router.query.type !== 'user',
	})

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<Card className="mt-2">
					{router.query.type === 'hashtag' && (
						<HashtagSearchResult data={HashtagData} />
					)}
					{router.query.type === 'user' && <UserSearchResult data={UserData} />}
				</Card>
			</div>
		</div>
	)
}
