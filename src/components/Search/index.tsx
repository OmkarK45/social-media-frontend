import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
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
				}
			}
		}
	}
`

export function SearchResults() {
	const router = useRouter()

	const { data } = useQuery<HashtagSearchQuery, HashtagSearchQueryVariables>(
		SEARCH_FOR_POST_BY_HASHTAG,
		{
			variables: {
				first: 10,
				keyword: ('#' + router.query.query) as string,
			},
			skip: router.query.type !== 'hashtag',
		}
	)

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
		<div>
			Search results go here
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<pre>{JSON.stringify(UserData, null, 2)}</pre>
		</div>
	)
}
