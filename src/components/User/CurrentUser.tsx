interface CurrentUserProps {
	avatar: string
	firstName: string

	username: string
}
export function CurrentUser({
	avatar,
	firstName,

	username,
}: CurrentUserProps) {
	return (
		<span className="flex w-full justify-between items-center">
			<span className="flex min-w-0 items-center justify-between space-x-3">
				<img
					className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
					src={avatar}
					alt=""
				/>
				<span className="flex-1 flex flex-col min-w-0">
					<span className="text-sm font-medium truncate">{firstName}</span>
					<span className="text-gray-500 text-sm truncate">@{username}</span>
				</span>
			</span>
		</span>
	)
}
