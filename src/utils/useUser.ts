import { gql, useQuery } from '@apollo/client'
import { MeQuery } from './__generated__/useUser.generated'

export const ME_QUERY = gql`
	query MeQuery {
		me {
			username
			firstName
			lastName
			id
			avatar
			coverImage
			coverImageBg
			bio
			email
		}
	}
`

export function useUser() {
	const { data, loading } = useQuery<MeQuery>(ME_QUERY, {
		fetchPolicy: 'cache-first',
	})

	return { user: data?.me, loading }
}
