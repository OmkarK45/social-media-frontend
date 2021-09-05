import { gql, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { LoginForm } from '~/components/Auth/SignIn'
import { ThemeToggle } from '~/components/ThemeSwitcher'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { Alert } from '~/components/ui/Alert'
import Heading from '~/components/ui/Heading'
import { HealthQuery } from './__generated__/index.generated'
import { Image as BlurImage } from '~/components/ui/Image'

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
			<div>
				<BlurImage
					width="400px"
					height="400px"
					blurHash="x6AjhNSXJ:SjE}JP]LJ=$R$9]D$9|#FY,u#*WbAv$TN=sW$AF3E^FHSNJOJV,G$AspwvJiNsJTf6FDj]o4WVs9wf"
					src="https://res.cloudinary.com/dogecorp/image/upload/v1630858417/dogesocial/v1/images/yca7gfzanqerpzjn4anz.jpg"
				/>
			</div>
			OK OK {loading && 'Loading'} {data && data.health}
			<div className="space-x-3">
				<Button variant="solid">Follow</Button>
				<Button variant="dark">Hello</Button>
				<Button variant="secondary">Hello</Button>
				<Button variant="white">Hello</Button>
				<Button variant="danger">Hello</Button>
			</div>
			<Card rounded="lg">
				<Heading>Hello aaa</Heading>
				<p className="text-muted">This is muted text</p>
			</Card>
			<Alert message="Password is incorrect" status="error" />
			<Alert message="Password is incorrect" status="success" />
			<Alert message="Password is incorrect" status="info" />
			<Alert message="Password is incorrect" status="warning" />
			<LoginForm />
		</div>
	)
}

export default Home
