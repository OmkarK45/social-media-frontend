import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { Link } from '~/components/ui/Link'
import { Followers } from './Followers'
import { Following } from './Following'

// tabs will go here
export function Follows() {
	const router = useRouter()

	const username = router.query.username as string

	console.log(username)

	return (
		<div className="max-w-3xl mx-auto max-h-screen ">
			<Card rounded="lg">
				<Card.Body className="flex space-x-4 items-center sticky top-0 z-10 dark:bg-gray-800">
					<div>
						<Link href={'/profile/edited_brown'}>← Back</Link>
					</div>
					<div>
						<Heading size="h4">Omkar Kulkarni</Heading>
						<p className="text-muted">@edited_brown</p>
					</div>
				</Card.Body>

				<Tab.Group>
					<Card.Body className="sticky top-20 dark:bg-gray-800 z-10" noPadding>
						<Tab.List
							className="-mb-px flex border-b border-gray-200 "
							aria-label="Tabs"
						>
							<Tab
								className={({ selected }) =>
									clsx(
										selected
											? 'border-brand-500 text-brand-600'
											: 'border-transparent text-gray-500 hover:text-brand-700 hover:border-brand-700',
										'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex-1'
									)
								}
							>
								<p className="text-base font-medium">Following</p>
							</Tab>
							<Tab
								className={({ selected }) =>
									clsx(
										selected
											? 'border-brand-500 text-brand-600'
											: 'border-transparent text-gray-500 hover:text-brand-700 hover:border-gray-300',
										'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex-1'
									)
								}
							>
								<p className="text-base font-medium">Followers</p>
							</Tab>
						</Tab.List>
					</Card.Body>
					<Tab.Panels>
						<Tab.Panel>
							<Followers username={username} />
						</Tab.Panel>
						<Tab.Panel>
							<Following username={username} />
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</Card>
		</div>
	)
}
