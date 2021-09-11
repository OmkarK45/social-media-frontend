import { gql, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { LoginForm } from '~/components/Auth/SignIn'
import { ThemeToggle } from '~/components/ThemeSwitcher'
import { HealthQuery } from './__generated__/index.generated'
import { Image as BlurImage } from '~/components/ui/Image'
import { Avatar } from '~/components/ui/Avatar'
import { Navbar } from '~/components/Common/Navbar'
import { Link } from '~/components/ui/Link'
import Image from 'next/image'
const query = gql`
	query HealthQuery {
		health
	}
`

const Home: NextPage = () => {
	const { error, loading, data } = useQuery<HealthQuery>(query)
	return (
		<>
			<Navbar />
			<div className="mt-[75px]">
				<Image
					src="https://c.tenor.com/fv-cPw-JouwAAAAC/need-link.gif"
					alt="GIF"
					width="100px"
					height="200px"
				/>
				<div className="space-x-2">
					<Link href="/about">about</Link>
					<Link href="/account/settings">Account Settings</Link>
				</div>
				<p>TODO : constrained layout</p>
				<ThemeToggle />
				<div>
					<BlurImage
						width="400px"
						height="400px"
						blurHash="x6AjhNSXJ:SjE}JP]LJ=$R$9]D$9|#FY,u#*WbAv$TN=sW$AF3E^FHSNJOJV,G$AspwvJiNsJTf6FDj]o4WVs9wf"
						src="https://res.cloudinary.com/dogecorp/image/upload/v1630858417/dogesocial/v1/images/yca7gfzanqerpzjn4anz.jpg"
					/>
				</div>
				<div>
					<Avatar
						rounded
						url="https://res.cloudinary.com/dogecorp/image/upload/v1630858417/dogesocial/v1/images/yca7gfzanqerpzjn4anz.jpg"
					/>
				</div>
				OK OK {loading && 'Loading'} {data && data.health}
				<LoginForm />
			</div>
		</>
	)
}

export default Home
