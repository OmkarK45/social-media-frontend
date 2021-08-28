import { gql, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { HealthQuery } from './__generated__/index.generated'
import Link from 'next/link'

export const query = gql`
	query HealthQuery {
		health
	}
`

const Home: NextPage = () => {
	const { data, loading, error } = useQuery<HealthQuery>(query)
	return (
		<div>
			{loading && 'Loading'}
			{data && `Health : ${data.health}`}
			<Link href="/about">Go next</Link>
		</div>
	)
}

export default Home
