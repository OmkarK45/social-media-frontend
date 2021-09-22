import { useRouter } from 'next/router'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'
import { UserSearchQuery } from './__generated__/index.generated'

export function UserSearchResult({
	data,
}: {
	data: UserSearchQuery | undefined
}) {
	const router = useRouter()
	return (
		<div>
			<Heading size="h4" className="py-4 px-4">
				Search Results for &quot;{router.query.query}&quot; in{' '}
				{router.query.type}s
			</Heading>
			<Card className="border-none">
				<div className="flow-root mt-2 px-4">
					<ul role="list" className=" divide-y divide-gray-200">
						{data?.searchUser.edges.map((edge) => (
							<li key={edge?.node.id} className="py-4">
								<div className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										<img
											className="h-8 w-8 rounded-full"
											src={edge?.node.avatar}
											alt=""
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium truncate">
											{edge?.node.firstName + edge?.node.lastName ??
												edge?.node.lastName}
										</p>
										<p className="text-sm text-gray-500 truncate">
											{'@' + edge?.node.username}
										</p>
									</div>
									<div>
										<Button
											variant="dark"
											href={`/profile/${edge?.node.username}`}
										>
											View Profile
										</Button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</Card>
		</div>
	)
}
