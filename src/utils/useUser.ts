import { gql, useQuery } from '@apollo/client'
import { MeQuery } from './__generated__/useUser.generated'

const ME_QUERY = gql`
	query MeQuery {
		me {
			username
			firstName
			id
			avatar
			coverImage
			coverImageBg
		}
	}
`

export function useUser() {
	const { data, loading } = useQuery<MeQuery>(ME_QUERY, {
		fetchPolicy: 'cache-first',
	})

	return { user: data?.me, loading }
}
