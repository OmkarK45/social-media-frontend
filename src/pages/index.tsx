import { gql, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { ThemeToggle } from '~/components/ThemeSwitcher'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card/Card'
import ErrorFallback from '~/components/ui/Fallbacks/ErrorFallback'
import Toggle from '~/components/ui/Form/Switch'
import Heading from '~/components/ui/Heading'
import { Status } from '~/components/ui/StatusPages/Status'
import { HealthQuery } from './__generated__/index.generated'

const query = gql`
	query HealthQuery {
		health
	}
`

const Home: NextPage = () => {
	const { error, loading, data } = useQuery<HealthQuery>(query)
	return (
		<div>
			<ThemeToggle />
			OK OK {loading && 'Loading'} {data && data.health}
			<div className="space-x-3">
				<Button variant="solid">Hello</Button>
				<Button variant="dark">Hello</Button>
				<Button variant="secondary">Hello</Button>
				<Button variant="white">Hello</Button>
				<Button variant="danger">Hello</Button>
			</div>
			<Card rounded="lg">
				<Heading>Hello aaa</Heading>
				<p className="text-muted">This is muted text</p>
			</Card>
			<ErrorFallback action={() => {}} />
			<Toggle />
		</div>
	)
}

export default Home
