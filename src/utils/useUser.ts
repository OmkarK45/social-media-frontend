import { gql, useQuery } from '@apollo/client'
import { MeQuery } from './__generated__/useUser.generated'

const ME_QUERY = gql`
	query MeQuery {
		me {
			username
			firstName
			id
			avatar
		}
	}
`

export function useUser() {
	const { data, loading } = useQuery<MeQuery>(ME_QUERY, {
		fetchPolicy: 'cache-and-network',
	})

	return { user: data?.me, loading }
}
