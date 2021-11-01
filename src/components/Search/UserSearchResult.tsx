import { useRouter } from 'next/router'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import { Heading } from '../ui/Heading'
import { UserSearchQuery } from './__generated__/index.generated'

export function UserSearchResult({
	data,
}: {
	data: UserSearchQuery | undefined
}) {
	const router = useRouter()

	if (!data)
		return (
			<ErrorFallback
				action={() => router.reload()}
				message={`Failed to load search result.`}
				buttonText="Try again."
			/>
		)

	const users = data.searchUser.edges

	return (
		<div>
			<Heading size="h4" className="py-4 px-4">
				Search Results for &quot;{router.query.query}&quot; in{' '}
				{router.query.type}s
			</Heading>
			<p className="text-muted text-sm  px-4">
				Want to search hashtags instead? Include a &apos;#&apos; in your query.
				eg. #doge
			</p>

			<div className="flow-root mt-2 px-4">
				<ul role="list" className=" divide-y divide-gray-200">
					{users.length > 0 ? (
						users.map((edge) => {
							const user = edge?.node

							if (user) {
								return (
									<li key={user.id} className="py-4">
										<div className="flex items-center space-x-4">
											<div className="flex-shrink-0">
												<img
													className="h-8 w-8 rounded-full"
													src={user.avatar!}
													alt=""
												/>
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium truncate">
													{user.firstName + user.lastName ?? user.lastName}
												</p>
												<p className="text-sm text-gray-500 truncate">
													{'@' + user.username}
												</p>
											</div>
											<div>
												<Button
													variant="dark"
													href={`/profile/${user.username}`}
												>
													View Profile
												</Button>
											</div>
										</div>
									</li>
								)
							}
						})
					) : (
						<ErrorFallback
							action={() => router.back()}
							message={`No users with the username "@${router.query.query}"`}
							buttonText="Go back"
						/>
					)}
				</ul>
			</div>
		</div>
	)
}
