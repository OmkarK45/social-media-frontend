import { gql, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { LoginForm } from '~/components/Auth/SignIn'
import { ThemeToggle } from '~/components/ThemeSwitcher'
import { HealthQuery } from './__generated__/index.generated'
import { Image as BlurImage } from '~/components/ui/Image'
import { Avatar } from '~/components/ui/Avatar'
import { Navbar } from '~/components/Common/Navbar'
import { Link } from '~/components/ui/Link'
import Modal from '~/components/ui/Modal'
import { useState } from 'react'
import { Button } from '~/components/ui/Button'
const query = gql`
	query HealthQuery {
		health
	}
`

const Home: NextPage = () => {
	const { error, loading, data } = useQuery<HealthQuery>(query)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<>
			<Navbar />
			<div className="mt-[75px]">
				<div className="space-x-2">
					<Link href="/about">about</Link>
					<Link href="/feed">feed</Link>
					<Link href="/account/settings">Account Settings</Link>
					<Link href="/post/new">New Post</Link>
					<Link href="/post/UG9zdDpiNDcyZDVlNS0wMzQyLTQwMDgtYmEzZi0wMDQwMWQ4OTRjOGI=">
						A post
					</Link>
					<Link href="/profile/@omkar_k45">User Profile</Link>
					<Link href="/feed/testpage">Feed post</Link>
				</div>
				<ThemeToggle />
				<Button onClick={() => setIsOpen(true)}>Open</Button>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
					<Modal.Content>
						<button>OK</button>
					</Modal.Content>
				</Modal>
				<div>
					<BlurImage
						width="500"
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
